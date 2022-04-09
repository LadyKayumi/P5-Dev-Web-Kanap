const params = new URLSearchParams(location.search);

const id = params.get("id");
// obtention de l'id du produit


fetch("http://localhost:3000/api/products/" + id)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    // fetch pour obtenir le nouvel url, qui contient l'id requêté plus haut

    .then(function (product) {
        if (!product) {
            let section =  document.querySelector(".item");
            section.querySelector("article").style.display = "none";

            let errorMessage = document.createElement("h1")
            errorMessage.textContent = "Aucun produit n'a été trouvé."
            section.append(errorMessage);
        } else {
            let productImg = document.createElement("img");

            productImg.setAttribute("src", product.imageUrl);
            productImg.setAttribute('alt', product.altTxt);

            const divImg = document.querySelector(".item__img");
            divImg.append(productImg);

            const divName = document.querySelector("#title");
            divName.textContent = product.name;

            const divPrice = document.querySelector('#price');
            divPrice.textContent = product.price;

            const divDescription = document.querySelector("#description");
            divDescription.textContent = product.description;

            const divOption = document.querySelector("#colors")
            product.colors.forEach(color => {
                let productColor = document.createElement("option");
                productColor.setAttribute("value", color);
                productColor.textContent = color;
                divOption.append(productColor);
            });
            const boutonPanier = document.querySelector("#addToCart");
            boutonPanier.onclick = addToCart;
        }
    })
    .catch(function (err) {
        console.error(err);
    });

function addToCart() {
    const panier = JSON.parse(localStorage.getItem("panier")) || []
    const quantity = document.querySelector("#quantity").value;
    const customColor = document.querySelector("#colors").value;
    if (!customColor) {
        return alert("Veuillez choisir une couleur.")
    }
    if (quantity <= 0 || quantity > 100) {
        return alert("Veuillez choisir un nombre entre 1 et 100.")
    }
    const findCanap = panier.find(canap => id == canap.id && customColor == canap.couleur);
    let canap = { id: id, couleur: customColor, quantité: Number(quantity) }

    if (findCanap) {
        findCanap.quantité = findCanap.quantité + canap.quantité;
    } else {
        panier.push(canap);
    }

    localStorage.setItem("panier", JSON.stringify(panier));
}