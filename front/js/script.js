fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (products) {
    displayProducts(products);
  })
  .catch(function (err) {
    // ERREUR
  });


function displayProducts(products) {
  //boucle sur le tableau products
  //dans la boucle on insert chaque produit dans le html

  //products
  products.forEach(element => {
    productHtml = createProductHtml(element);
    document.getElementById('items').append(productHtml);
  });
}

function createProductHtml(element) {
  let productBloc = document.createElement('a');
  productBloc.setAttribute('href', './product.html?id=' + element._id);

  let articleBloc = document.createElement('article');

  let articleImg = document.createElement('img');
  articleImg.setAttribute('src', element.imageUrl);
  articleImg.setAttribute('alt', element.altTxt)

  let articleH3 = document.createElement('h3');
  articleH3.classList.add('productName');
  articleH3.innerHTML = element.name;

  let articleP = document.createElement('p');
  articleP.classList.add('productDescription');
  articleP.innerHTML = element.description;

  articleBloc.append(articleImg);
  articleBloc.append(articleH3);
  articleBloc.append(articleP);

  productBloc.append(articleBloc);

  return productBloc;
}