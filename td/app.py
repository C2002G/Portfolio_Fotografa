import os
from flask import Flask, render_template, request, redirect, url_for, session, flash

app = Flask(__name__)
app.secret_key = "Balu2022"

# Pasta base das imagens
IMG_FOLDER = os.path.join(app.root_path, "static", "img")


@app.route("/")
def home():
    # Listar categorias disponíveis para o portfólio
    categorias = [
        d
        for d in os.listdir(IMG_FOLDER)
        if os.path.isdir(os.path.join(IMG_FOLDER, d)) and d != "logo"
    ]

    # Mapear categorias para nomes de exibição e filtros
    categoria_info = {
        "BookColorado": {
            "nome": "Book Colorido",
            "filtro": "colorful",
            "descricao": "Ensaio com energia",
        },
        "Familiares": {
            "nome": "Ensaio Familiar",
            "filtro": "family",
            "descricao": "Momentos em família",
        },
        "Joias": {
            "nome": "Joias",
            "filtro": "jewelry",
            "descricao": "Beleza e elegância",
        },
        "POA": {
            "nome": "Cinematografia POA",
            "filtro": "city",
            "descricao": "Fotos por Porto Alegre",
        },
        "Museu": {
            "nome": "Museu do Inter",
            "filtro": "museum",
            "descricao": "História colorada",
        },
        "Torcida": {
            "nome": "Torcida do Inter",
            "filtro": "fans",
            "descricao": "Paixão vermelha",
        },
        "Renovação": {
            "nome": "Renovação",
            "filtro": "renovation",
            "descricao": "Transformação e beleza",
        },
        "Slider": {
            "nome": "Destaques",
            "filtro": "highlights",
            "descricao": "Melhores momentos",
        },
    }

    # Obter primeira imagem de cada categoria para preview
    for categoria in categorias:
        pasta = os.path.join(IMG_FOLDER, categoria)
        if os.path.exists(pasta):
            imagens = [
                f for f in os.listdir(pasta) if os.path.isfile(os.path.join(pasta, f))
            ]
            if imagens and categoria in categoria_info:
                categoria_info[categoria]["imagem"] = imagens[0]

    return render_template(
        "index.html", categorias=categorias, categoria_info=categoria_info
    )


@app.route("/admin", methods=["GET", "POST"])
def admin():
    if not session.get("logged_in"):
        return redirect(url_for("login"))

    # Listar categorias (subpastas)
    categorias = [
        d for d in os.listdir(IMG_FOLDER) if os.path.isdir(os.path.join(IMG_FOLDER, d))
    ]
    categoria = request.args.get("categoria", categorias[0] if categorias else None)

    imagens = []
    if categoria:
        pasta = os.path.join(IMG_FOLDER, categoria)
        imagens = sorted(
            set(f for f in os.listdir(pasta) if os.path.isfile(os.path.join(pasta, f)))
        )

    grid_html = ""
    for img in sorted(set(imagens)):
        img_url = url_for("static", filename=f"img/{categoria}/{img}")
        grid_html += f"""
        <div class="admin-item">
            <img src="{img_url}" alt="{img}">
            <input type="checkbox" name="imagens" value="{img}">
            <form method="post" action="{url_for('delete', categoria=categoria, imagem=img)}" onsubmit="return confirm('Remover esta foto?');">
                <button type="submit" style="background:#c00;color:#fff;border:none;padding:4px 8px;border-radius:4px;">Remover</button>
            </form>
        </div>
        """

    return render_template(
        "admin.html",
        categorias=categorias,
        categoria=categoria,
        imagens=imagens,
        grid_html=grid_html,
    )


@app.route("/upload", methods=["POST"])
def upload():
    if not session.get("logged_in"):
        return redirect(url_for("login"))

    categoria = request.form.get("categoria")
    arquivos = request.files.getlist("arquivo")

    if not categoria or not arquivos or arquivos[0].filename == "":
        flash("Selecione uma categoria e pelo menos um arquivo!")
        return redirect(url_for("admin", categoria=categoria))

    for arquivo in arquivos:
        if not arquivo.filename.lower().endswith((".png", ".jpg", ".jpeg", ".gif")):
            flash(f"Arquivo {arquivo.filename} não é uma imagem!")
            continue
        pasta = os.path.join(IMG_FOLDER, categoria)
        os.makedirs(pasta, exist_ok=True)
        caminho = os.path.join(pasta, arquivo.filename)
        arquivo.save(caminho)
    flash("Upload concluído!")
    return redirect(url_for("admin", categoria=categoria))


@app.route("/delete/<categoria>/<imagem>", methods=["POST"])
def delete(categoria, imagem):
    if not session.get("logged_in"):
        return redirect(url_for("login"))

    caminho = os.path.join(IMG_FOLDER, categoria, imagem)
    if os.path.exists(caminho):
        os.remove(caminho)
        flash("Imagem removida!")
    else:
        flash("Imagem não encontrada!")
    return redirect(url_for("admin", categoria=categoria))


@app.route("/delete_multiple/<categoria>", methods=["POST"])
def delete_multiple(categoria):
    if not session.get("logged_in"):
        return redirect(url_for("login"))
    imagens = request.form.getlist("imagens")
    pasta = os.path.join(IMG_FOLDER, categoria)
    removidas = 0
    for img in imagens:
        caminho = os.path.join(pasta, img)
        if os.path.exists(caminho):
            os.remove(caminho)
            removidas += 1
    flash(f"{removidas} imagens removidas!")
    return redirect(url_for("admin", categoria=categoria))


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        usuario = request.form["usuario"]
        senha = request.form["senha"]
        if usuario == "admin" and senha == "Balu2022":
            session["logged_in"] = True
            return redirect(url_for("admin"))
        else:
            return "Login inválido"
    return render_template("login.html")


@app.route("/logout")
def logout():
    session.pop("logged_in", None)
    return redirect(url_for("home"))


@app.route("/galeria/<categoria>")
def galeria(categoria):
    pasta = os.path.join(IMG_FOLDER, categoria)
    if not os.path.exists(pasta):
        return "Categoria não encontrada", 404
    imagens = [f for f in os.listdir(pasta) if os.path.isfile(os.path.join(pasta, f))]
    return render_template("galeria.html", categoria=categoria, imagens=imagens)


if __name__ == "__main__":
    app.run(debug=True)
