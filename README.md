﻿# FullStackApp-SigmaCode
# Instalacja 
# Wymagane programy:
-python(min. 3.8)
-node.js
-git 

Projekt odpalamy poprzez terminal(w moim przypadku vscode)

1.Sklonowanie repozytorium:
git clone https://github.com/kubadewerenda/FullStackApp-SigmaCode.git
cd FullStackApp-SigmaCode

2.Backend:
cd backend
python -m venv venv
source venv/bin/activate - Linux/Mac
venv\Scripts\activate - Windows
pip install -r requirements.txt
python manage.py runserver - działa na http://127.0.0.1:8000/

3.Frontend:
cd frontend
npm install
npm run dev - działa na http://localhost:5173/

Teraz po wejściu na hosta http://localhost:5173/ można testować projekt :)
