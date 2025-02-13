# FullStackApp-SigmaCode<br>
# Instalacja <br>
# Wymagane programy:<br>
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
