const panier = JSON.parse(localStorage.getItem("panier"));
if (panier) {
    cart();
};
//appel du panier situé dans le local storage, pour pouvoir l'exploiter

function cart() {
    // section cart__items
    const cartItems = document.querySelector("#cart__items")
    panier.forEach(element => {
        fetch("http://localhost:3000/api/products/" + element.id)
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function (product) {

                // article cart__item
                let cartItem = document.createElement("article");

                cartItem.setAttribute("class", "cart__item");
                cartItem.setAttribute("data-id", element.id);
                cartItem.setAttribute("data-color", element.couleur);

                cartItems.append(cartItem);

                // div cart__item__img
                let cartItemImgDiv = document.createElement("div")
                cartItemImgDiv.setAttribute("class", "cart__item__img")

                cartItem.append(cartItemImgDiv);

                // image dans la div cart__item__img
                let cartItemImg = document.createElement("img")

                cartItemImg.setAttribute("src", product.imageUrl);
                cartItemImg.setAttribute("alt", product.altTxt);

                cartItemImgDiv.append(cartItemImg);

                // div cart__item__content
                let cartItemContent = document.createElement("div")
                cartItemContent.setAttribute("class", "cart__item__content")

                cartItem.append(cartItemContent);

                //div cart__item__content__decription
                let cartItemDescription = document.createElement("div")
                cartItemDescription.setAttribute("class", "cart__item__content__description")

                cartItemContent.append(cartItemDescription);

                // h2 dans la div cart__item__content__decription
                let productName = document.createElement("h2")
                productName.textContent = product.name;

                // p pour le couleur dans la div 
                // cart__item__content__decription
                let productColor = document.createElement("p")
                productColor.textContent = element.couleur;

                // p pour le prix dans la div 
                // cart__item__content__decription
                let productPrice = document.createElement("p")
                productPrice.textContent = product.price + "€";

                cartItemDescription.append(productName);
                cartItemDescription.append(productColor);
                cartItemDescription.append(productPrice);

                // div cart__item__content__settings
                let cartItemSettings = document.createElement("div")
                cartItemSettings.setAttribute("class", "cart__item__content__settings")

                cartItemContent.append(cartItemSettings);

                //div cart__item__content__settings_quantity
                let cartItemQuantity = document.createElement("div")
                cartItemQuantity.setAttribute("class", "cart__item__content__settings__quantity")

                cartItemSettings.append(cartItemQuantity)

                // p pour la quantité
                let cartItemQuantityNumber = document.createElement("p")
                cartItemQuantityNumber.textContent = "Qté : "

                cartItemQuantity.append(cartItemQuantityNumber);

                // input pour le choix de la quantité
                let cartInputQuantity = document.createElement("input")
                cartInputQuantity.setAttribute("type", "number")
                cartInputQuantity.setAttribute("class", "itemQuantity")
                cartInputQuantity.setAttribute("name", "itemQuantity")
                cartInputQuantity.setAttribute("min", "1")
                cartInputQuantity.setAttribute("max", "100")
                cartInputQuantity.setAttribute("value", element.quantité)
                cartInputQuantity.onchange = modifier;

                cartItemQuantity.append(cartInputQuantity);

                // div cart__items__content__settings__delete
                let cartItemDelete = document.createElement("div")
                cartItemDelete.setAttribute("class", "cart__item__content__settings__delete")

                // p contenant le texte "Supprimer"
                let deleteText = document.createElement("p")
                deleteText.setAttribute("class", "deleteItem")
                deleteText.textContent = "Supprimer";
                deleteText.onclick = supprimer;

                cartItemDelete.append(deleteText);

                cartItemSettings.append(cartItemDelete);
            })
            .catch(error => console.error(error));
    })
    total();
}
function total() {
    let quantité = 0;
    let price = 0;
    const panier = JSON.parse(localStorage.getItem("panier"));
    panier.forEach(element => {
        fetch("http://localhost:3000/api/products/" + element.id)
            .then(function (res) {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(function (product) {
                quantité = element.quantité + quantité;
                price = (product.price * element.quantité) + price;
                console.log(price);

                // span pour la quantité
                const quantitéTotale = document.querySelector("#totalQuantity")
                quantitéTotale.textContent = quantité;

                //span pour le pric
                const prixTotal = document.querySelector("#totalPrice")
                prixTotal.textContent = price;
            })
    })
}

function supprimer(event) {
    const panier = JSON.parse(localStorage.getItem("panier"));
    const article = event.target.closest("article");
    const articleId = article.dataset.id;
    const articleColor = article.dataset.color;
    const update = panier.filter(canap => articleId != canap.id || articleColor != canap.couleur)
    article.remove();
    localStorage.setItem("panier", JSON.stringify(update));
    total();
}

function modifier(event) {
    const panier = JSON.parse(localStorage.getItem("panier"));
    const inpout = Number(event.target.value);
    const article = event.target.closest("article");
    const articleId = article.dataset.id;
    const articleColor = article.dataset.color;
    const update = panier.find(canap => articleId == canap.id && articleColor == canap.couleur);
    update.quantité = inpout;
    localStorage.setItem("panier", JSON.stringify(panier));
    total();
}

document.querySelector("#order").onclick = commander;

const nameRegex = /^[A-zÀ-ú' -]+$/

const adressRegex = /([0-9]{1,}) ?([A-zÀ-ú,' -. ]*)/

const mailRegex = /^[A-z0-9-_.]{1,}[@][A-z-]{2,}[.][A-z]{2,}$/

function commander(event) {
    event.preventDefault();
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const address = document.querySelector("#address").value;
    const city = document.querySelector("#city").value;
    const email = document.querySelector("#email").value;

    const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
    const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
    const addressErrorMsg = document.querySelector("#addressErrorMsg");
    const cityErrorMsg = document.querySelector("#cityErrorMsg");
    const emailErrorMsg = document.querySelector("#emailErrorMsg");

    let isGood = true;

    if (firstName.match(nameRegex)) {
        firstNameErrorMsg.textContent = ''
    } else {
        firstNameErrorMsg.textContent = 'Veuillez saisir un prénom.'
        isGood = false;
    }

    if (lastName.match(nameRegex)) {
        lastNameErrorMsg.textContent = ''
    } else {
        lastNameErrorMsg.textContent = 'Veuillez saisir un nom.'
        isGood = false;
    }

    if (address.match(adressRegex)) {
        addressErrorMsg.textContent = ''
    } else {
        addressErrorMsg.textContent = 'Veuillez saisir une adresse.'
        isGood = false;
    }

    if (city.match(nameRegex)) {
        cityErrorMsg.textContent = ''
    } else {
        cityErrorMsg.textContent = 'Veuillez saisir une ville.'
        isGood = false;
    }

    if (email.match(mailRegex)) {
        emailErrorMsg.textContent = ''
    } else {
        emailErrorMsg.textContent = 'Veuillez saisir un email.'
        isGood = false;
    }
    if (isGood == false) {
        return;
    }
    let contact = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email
    };
    const panier = JSON.parse(localStorage.getItem("panier"));
    let produits = []
    panier.forEach(element => {
        produits.push(element.id);
    })
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ contact, products: produits })
    })
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (data) {
            let orderId = data.orderId;
            location.replace("confirmation.html?id=" + orderId)
        })
}