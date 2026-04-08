import json
import os

def get_docker_userns_offset():
    config_path = '/etc/docker/daemon.json'
    subuid_path = '/etc/subuid'
    
    if not os.path.exists(config_path):
        return 0

    try:
        with open(config_path, 'r') as f:
            config = json.load(f)
            remap_user = config.get('userns-remap')
            
        if not remap_user:
            return 0

        search_user = 'dockremap' if remap_user == 'default' else remap_user
        
        if not os.path.exists(subuid_path):
            return 0

        with open(subuid_path, 'r') as f:
            for line in f:
                if line.startswith(f"{search_user}:"):
                    parts = line.strip().split(':')
                    if len(parts) >= 2:
                        return int(parts[1])
        
        return 0

    except (json.JSONDecodeError, PermissionError, ValueError, IndexError):
        return 0

if __name__ == "__main__":
    offset = get_docker_userns_offset()
    backend_base_uid = 10001
    backend_base_gid = 10001
    backend_uid = offset + backend_base_uid
    backend_gid = offset + backend_base_gid

    try:
        os.chown("images", backend_uid, backend_gid)
        for root, dirs, files in os.walk("images"):
            for d in dirs:
                os.chown(os.path.join(root, d), backend_uid, backend_gid)
            for f in files:
                os.chown(os.path.join(root, f), backend_uid, backend_gid)
        print(f"Successfully set ownership for 'images' and its content")
    except PermissionError:
        print("Error: Script must be run with sudo")

    try:
        os.chown("database", backend_uid, backend_gid)
        for root, dirs, files in os.walk("database"):
            for d in dirs:
                os.chown(os.path.join(root, d), backend_uid, backend_gid)
            for f in files:
                os.chown(os.path.join(root, f), backend_uid, backend_gid)
        print(f"Successfully set ownership for 'database' and its content")
    except PermissionError:
        print("Error: Script must be run with sudo")