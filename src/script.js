$(document).ready(function () {
  var products = [
    { id: 101, name: "Basket Ball", image: "basketball.png", price: 150 },
    { id: 102, name: "Football", image: "football.png", price: 120 },
    { id: 103, name: "Soccer", image: "soccer.png", price: 110 },
    { id: 104, name: "Table Tennis", image: "table-tennis.png", price: 130 },
    { id: 105, name: "Tennis", image: "tennis.png", price: 100 },
  ];
  $.fn.addProductCard = function (parent_div, product) {
    let id = product.id;
    let name = product.name;
    let img = product.image;
    let price = product.price;
    parent_div.append("<div id='product-" + id + "' class='product'></div>");
    product_div = $("#product-" + id);
    product_div.append("<img src='images/" + img + "'>");
    product_div.append(
      "<h3 class='title'><a href='#'>" + name + "</a></h3>"
    );
    product_div.append("<span>Price: $"+ price+"</span>")
    product_div.append("<a class='add-to-cart' href='#' data-id='"+id+"'>Add To Cart</a>");
  };
  $.fn.loadBasicHtml = function () {
    let main_div = $("#main");
    main_div.append("<div id='products'></div>");
    let product_div = $("#products");
    for (let i = 0; i < products.length; i++) {
      product_div.append($.fn.addProductCard(product_div, products[i]));
    }
  };
  $.fn.loadBasicHtml();
  //end script
});
