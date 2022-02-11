$(document).ready(function () {
  var products = [
    { id: 101, name: "Basket Ball", image: "basketball.png", price: 150 },
    { id: 102, name: "Football", image: "football.png", price: 120 },
    { id: 103, name: "Soccer", image: "soccer.png", price: 110 },
    { id: 104, name: "Table Tennis", image: "table-tennis.png", price: 130 },
    { id: 105, name: "Tennis", image: "tennis.png", price: 100 },
  ];
  var cart = [];
  var subtotal = 0;
  //add prodct card for each product
  $.fn.addProductCard = function (parent_div, product) {
    let id = product.id;
    let name = product.name;
    let img = product.image;
    let price = product.price;
    parent_div.append("<div id='product-" + id + "' class='product'></div>");
    product_div = $("#product-" + id);
    product_div.append("<img src='images/" + img + "'>");
    product_div.append("<h3 class='title'><a href='#'>" + name + "</a></h3>");
    product_div.append("<span>Price: $" + price + "</span>");
    product_div.append(
      "<a class='add-to-cart' href='#' data-id='" + id + "'>Add To Cart</a>"
    );
  };
  //load cart
  $.fn.loadCart = function () {
    var main_div = $("#main");
    main_div.append("<div id='wrapper'></div>");
    let Wrapperdiv = $("#wrapper");
    Wrapperdiv.empty();
    subtotal = 0;
    // button to delete cart
    Wrapperdiv.append(
      "<input type='button' value='Delete Cart' id='deleteCart'>"
    );
    Wrapperdiv.append(
      '<div id="product_list"><table id="product-table"></table></div>'
    );
    let table = $("#product-table");
    table.append(
      "<tr>" +
        "<th>Product Id</th>" +
        "<th>Product Name</th>" +
        "<th>Product Price</th>" +
        "<th>Quantity</th>" +
        "<th>Action</th>" +
        "</tr>"
    );
    if (cart.length > 0) {
      $.fn.updateCart();
    }
  };
  //update table data
  $.fn.updateCart = function () {
    let table = $("#product-table");
    for (let i = 0; i < cart.length; i++) {
      var current_product = cart[i];
      var index = $.fn.findProductIndex(cart[i].id);
      subtotal += products[index].price * current_product.quantity;

      table.append(
        "<tr class='cart'><td>" +
          current_product.id +
          "</td>" +
          "<td>" +
          products[index].name +
          "</td> " +
          "<td>" +
          products[index].price * current_product.quantity +
          "</td>" +
          "<td>" +
          current_product.quantity +
          "</td>" +
          "<td id='actionTd' data-id='" +
          current_product.id +
          "'><a href='#' data-value='increase' id='increaseQuantity'>+</a>" +
          "<input id='manual-update-quantity' value=" +
          current_product.quantity +
          ">" +
          "<a href='#' data-value='decrease' id='decreaseQuantity'>-</a>" +
          "<input type='button' value='UPDATE' id='update'>" +
          "</td></tr>"
      );
    }
    //update subtotal
//load cart report
    $("#product_list").append("<p id='subtotal'>Your subtotal is $" + subtotal + "</p>");
  };

  //load basic html
  $.fn.loadBasicHtml = function () {
    var main_div = $("#main");
    main_div.append("<div id='products'></div>");
    let product_div = $("#products");
    //add product cards
    for (let i = 0; i < products.length; i++) {
      product_div.append($.fn.addProductCard(product_div, products[i]));
    }

    //load product card
    $.fn.loadCart();
    
    
  };
  //find product in product list
  $.fn.findProductIndex = function (product_id) {
    for (var i = 0; i < products.length; i++) {
      if (product_id == products[i].id) {
        return i;
      }
    }
    return -1;
  };
  //add to cart
  $("body").on("click", ".add-to-cart", function () {
    let pid = $(this).data("id");
    let bool = true;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id == pid) {
        cart[i].quantity += 1;
        bool = false;
        break;
      }
    }
    if (bool) {
      cart.push({ id: pid, quantity: 1 });
    }

    $.fn.loadCart();
  });
  //increase quantity
  $("body").on("click", "#increaseQuantity ,#decreaseQuantity", function () {
    let action = $(this).data("value");
    let pid = $(this).parent().data("id");
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].id == pid) {
        break;
      }
    }

    if (action == "increase") {
      cart[i].quantity += 1;
    } else {
      cart[i].quantity -= 1;

      if (cart[i].quantity < 1) {
        cart.splice(i, 1);
      }
    }

    $.fn.loadCart();
  });
  // delete cart
  $("body").on("click", "#deleteCart", function () {
    console.log("clicked delete");
    cart = [];
    subtotal = 0;
    $.fn.loadCart();
  });
  //update quantity by text field
  $("body").on("click", "#update", function () {
    var new_quantity = $("#manual-update-quantity").val();
    let pid = $(this).parent().data("id");

    for (var i = 0; i < cart.length; i++) {
      if (pid == cart[i].id) {
        console.log("updating =", cart[i]);
        if (new_quantity == 0) {
          cart.splice(i, 1);
        } else {
          cart[i].quantity = new_quantity;
        }

        $.fn.loadCart();
      }
    }
  });
  $.fn.loadBasicHtml();
  //end script
});
