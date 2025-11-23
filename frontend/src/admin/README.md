# Amin Panel

## Instrukcja używania

### 0. TIP - Spróbuj po prostu wejść i go użyć. Jeżeli coś nie jest jasne czytaj dalej.

### 1. Wejście

Aby dostać się na admin panel, trzeba wejść na główną stronę i dopisać **/admin** do URL'a.

### 2. Logowanie

Później trzeba sie zalogować, używając ustalonego **API_KEY**.

### 3. Wybór Sekcji

Po zalogowaniu wybierz jedną z dostępnych sekcji:

- **About Board** – edycja członków zarządu.
- **About VIP** – edycja „ważnych” członków koła: administratorów, gospodarzy, opiekuna naukowego (supervisor), członków honorowych oraz komisji.
- **Projects** – edycja treści na stronie projektów.
- **News** – edycja treści na stronie aktualności.

### 4. Wybór operacji

Dla każdej sekcji dostępnych jest pięć operacji:

- **Create** – dodanie nowego elementu.
- **Delete** – usunięcie elementu.
- **Update** – aktualizacja istniejącego elementu.
- **Read All** – wyświetlenie wszystkich elementów w sekcji.
- **Read by ID** – wyświetlenie konkretnego elementu na podstawie jego ID.

### 5. Formularze

Po wybraniu sekcji i operacji:

1. Pojawi się formularz z odpowiednimi polami.
2. Wypełnij wszystkie wymagane pola.
3. Kliknij **Submit**.

W zależności od operacji:

- możesz zostać przeniesiony do kolejnego formularza (np. wyboru elementu do edycji),
- lub zobaczysz komunikat informujący o pomyślnym wykonaniu operacji.

## Problemy i uwagi

- Przy edycji **About Board** zawsze dodawaj **president** oraz **vicepresident**.  
  Jeśli dodasz tylko jedno z tych pól, strona nie wyświetli się poprawnie i spowoduje błąd.
- W polu "photo URL" trzeba dać ścieżkę zaczynającą się od "/" do pliku znajdującego się w folderze fronted/public/...
