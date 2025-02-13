# FullStackApp-SigmaCode<br>
#-----Instalacja----- <br>
#Wymagane programy:<br>
-python(min. 3.8)<br>
-node.js<br>
-git<br><br>

Projekt odpalamy poprzez terminal(w moim przypadku vscode)<br><br>

1.Sklonowanie repozytorium:<br>
git clone https://github.com/kubadewerenda/FullStackApp-SigmaCode.git<br>
cd FullStackApp-SigmaCode<br><br>

2.Backend:<br>
cd backend<br>
python -m venv venv<br>
source venv/bin/activate - Linux/Mac<br>
venv\Scripts\activate - Windows<br>
pip install -r requirements.txt<br>
python manage.py runserver - działa na http://127.0.0.1:8000/<br><br>

3.Frontend:<br>
cd frontend<br>
npm install<br>
npm run dev - działa na http://localhost:5173/<br><br>

Teraz po wejściu na hosta http://localhost:5173/ można testować projekt :)<br><br>

#-----Opis implementacji i decyzji technicznych-----<br>
Projekt to system ogłoszeniowy, który został stworzony w oparciu o Django REST Framework (DRF) jako backend oraz React + Tailwind CSS jako frontend. Celem było stworzenie wydajnej, elastycznej i intuicyjnej <br>aplikacji, umożliwiającej dodawanie, edycję, usuwanie oraz przeglądanie ogłoszeń. System obsługuje również przesyłanie zdjęć oraz posiada paginację, obsługę błędów oraz responsywny interfejs użytkownika.<br><br>

#Backend–Django REST Framework<br>
Został zaimplementowany w Django(DRF).<br><br>

Decyzje techniczne(w skrócie):<br><br>

DRF-obsługa API<br>
Model Advertisement–obsługuje tytuł, treść, status, kategorię, autora, kontakt oraz img<br>
Serializer AdvertisementSerializer–obsługuje walidację<br>
Obsługa obrazków–przechowywane w MEDIA_ROOT, przesyłane przez API jako multipart/form-data<br>
Paginacja–3 ogłoszenia na stronie<br>
Obsługa błędów–customowy handler błędów custom_exception_handler<br>
CORS Headers–połączenie frontend-backend.<br><br>

Endpointy API:<br><br>

GET	/api/advertisements/	Lista ogłoszen<br>
POST	/api/advertisements/	Tworzy ogłoszenie<br>
GET	/api/advertisements/{id}/	Wyświetlanie pojedynczego ogłoszenia<br>
PUT	/api/advertisements/{id}/	Edytuje ogłoszenie<br>
DELETE	/api/advertisements/{id}/	Usuwa ogłoszenie<br><br>

#Frontend–React + Tailwind CSS<br>
Został zbudowany w React+Tailwind CSS.<br><br>

Decyzje techniczne(w skrócie):<br><br>

Axios komunikacja z API–zapytania do backendu<br>
React Router–nawigacja pomiędzy stronami<br>
Tailwind CSS–czysty, nowoczesny design i responsywność<br>
Błedy API–react-toastify do wyświetlania komunikatów<br>
Dwa różne formularze–implementacja dwóch podejść<br>
Obsługa paginacji–dynamiczne ladowanie stron z wykorzystaniem parametrów URL.<br>
Automatyczna aktualizacja listy po dodaniu/edycji/usunięciu ogłoszenia<br><br>

#Obsługa błędów obejmuje:<br><br>

Walidację formularzy-np. minimalna długość tytułu i treści.<br>
Limit aktywnych ogłoszeń-max. 5 aktywnych.<br>
Błędy sieciowe-np. brak połączenia z backendem.<br>

#Wyświetlanie błędow<br><br>

Frontend-react-toastify<br>
Backend-custom_exception_handler zwraca error_message.<br><br>

#Responsywność:<br><br>

Oparta na grid.<br>
Formularze są skalowane i dostosowane do ekranów mobilnych.
