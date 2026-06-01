import tarfile
import os
from pathlib import Path

def is_within_directory(directory, target):
    """Check if the target path is inside the directory."""
    abs_directory = os.path.abspath(directory)
    abs_target = os.path.abspath(target)
    prefix = os.path.commonprefix([abs_directory, abs_target])
    return prefix == abs_directory

def safe_extract(tar, path="."):
    """Safe extraction without filter (for Python < 3.12)."""
    for member in tar.getmembers():
        member_path = os.path.join(path, member.name)
        if not is_within_directory(path, member_path):
            raise Exception("Attempted Path Traversal in Archive")
    tar.extractall(path)

def extract_latest_backup(target_dir: str = "."):
    """Detect and extract the latest backup file for Python 3.9."""
    files = list(Path(".").glob("backup_*.tar.gz"))
    if not files:
        print("No backup files found.")
        return

    latest_file = max(files, key=lambda f: f.stat().st_mtime)
    print(f"Detected latest backup: {latest_file.name}")
    
    try:
        with tarfile.open(latest_file, "r:gz") as tar:
            # Using the custom safety function instead of filter='data'
            safe_extract(tar, target_dir)
            
        print(f"Successfully extracted to: {Path(target_dir).resolve()}")
    except Exception as e:
        print(f"Error during extraction: {e}")

if __name__ == "__main__":
    extract_latest_backup()