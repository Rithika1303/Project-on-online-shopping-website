var productArr = localStorage.getItem('product') === null ?[]: JSON.parse(localStorage.getItem('product'));
function myfunc(ans){
    $('.con1').html('');
    $.ajax({
        type: "GET",
        url: "data1.json",
        success: function(data){
            var path1;
            if(ans[0]=== 'm')
            {
                path1= data.products.men;
            }
            else if(ans[0] === 'w')
            {
                path1= data.products.women;
            }
            else{
                path1= data.products.kids;
            }
            for( var i =0; i<path1.length; i++)
            {
                var x= path1[i].productId;
                if(x === ans)
                {
                    var obj1= `
                    <div class="col-lg-5 mt-4">
                        <img src="${path1[i].imagelink}" class="img-fluid img-thumbnail rounded">
                    </div>
                    <div class="col-lg-7 g-4 pt-2">
                        <h2>${path1[i].productName}</h2>
                        <div class="row mt-3">
                        <p>Price: ${path1[i].price}</p>
                        <div class="row color1"><p>Color:</p></div>
                        <div>description:
                            <p>Material: ${path1[i].description.material}</p>
                            <p>Sleeves: ${path1[i].description.sleeves}</p>
                            <p>Size: ${path1[i].description.size}</p>
                        </div>
                        <div class="row">
                        <div class=" col-lg-4">
                            <a type="button" href="shoppingbasket.html" class="btn btn-primary float-right"
                            data-bs-toggle="offcanvas" data-bs-target="#shoppingCart" aria-controls="shoppingCart" onclick="myfunc1('${path1[i].productId}')">add to cart</a>
                            </div>
                        </div>
                        </div>
                    </div>`;
                    var objcol ='';
                    for(var j = 0 ; j<path1[i].availableColor.length; j++)
                    {
                        objcol += `
                        <div class="col col-2 m-2 card mini" style="background-color: ${data.products.men[i].availableColor[j]};"></div>`;
                    }
                    $('.con2').append(obj1);
                    $('.color1').append(objcol);
                }
            }
        }
    })
}
function myfunc1(ans){
    $.ajax({
        type: "GET",
        url: "data1.json",
        success: function(data){
            var path1;
            if(ans[0]=== 'm')
            {
                console.log('m');
                path1= data.products.men;
            }
            else if(ans[0] === 'w')
            {
                console.log('w');
                path1= data.products.women;
            }
            else{
                console.log('else');
                path1= data.products.kids;
            }
            for( var i =0; i<path1.length; i++)
            {
                var x= path1[i].productId;
                if(x === ans) {
                    var flag=0;
                    var cart =JSON.parse(localStorage.getItem('product'));
                    if(cart){
                    for( var j = 0; j < cart.length; j++)
                        {
                            flag=0;
                            console.log("j= "+ cart.length + cart[j].productId+ "x="+ x);
                            if(cart[j].productId === x)
                            {
                                alert("this product is already in the cart");
                                flag=1;
                                break;
                            }
                        }
                    }
                        if(flag===0){
                        productArr.push(path1[i]);
                        localStorage.setItem('product', JSON.stringify(productArr));
                        {
                            var obj2= `
                            <tr>
                                <td class="col-sm-8 col-md-6">
                                    <div class="media">
                                        <img class="mr-3 thumbnail img-fluid" width="75"
                                        src="${path1[i].imagelink}" alt="${path1[i].productName}"></img>
                                        <div class="media-body">
                                            <h5 class="mt-0 media-heading text-primary">${path1[i].productName}</h5>
                                        </div>
                                    </div>
                                </td>
                                <td class="col-sm-1 col-md-1" style="text-align: center">
                                    <input type="number" class="form-control" id="${path1[i].productId}" value="${path1[i].quantity}" min="1" onchange="change1('${path1[i].productId}', '${path1[i].price}')"></input>
                                    </td>
                                <td class="col-sm-1 col-md-1 text-center">
                                    <strong>${path1[i].price}</strong>
                                </td>
                            <td  class="col-sm-1 col-md-1 text-center">
                                <strong id="total${path1[i].productId}">${path1[i].total}</strong></td>
                                <td class="col-sm-1 col-md-1">
                                <a type="button" class="btn btn-danger" onclick="clear2('${path1[i].productId}')">
                                    X
                                </a>
                            </td>
                            </tr>
                            `;
                        }
                        $('.insert').append(obj2);
                        cal();
                        }
                }
            }
        }
    })
}
function cal(){
    var cart =JSON.parse(localStorage.getItem('product'));
    var amt1=0;
    if(cart){
        for( var j = 0; j < cart.length; j++)
        {
            amt1+= cart[j].total;
        }
    }
    console.log("hi");
    document.getElementById('amt').innerHTML="Total Amount: "+amt1;
}
function clear1(){
    productArr=[];
    localStorage.removeItem('product');
    localStorage.clear();
    $('.insert').html('');
}
function clear2(prodid){
    console.log(prodid);
    var cart =JSON.parse(localStorage.getItem('product'));
    if(cart){
        for( var j = 0; j < cart.length; j++)
        {
            if(cart[j].productId === prodid)
            {
                document.getElementById("mytable").deleteRow(j+1);  
                productArr.splice(j,1);
                let temp= cart.filter(item => item.productId != prodid);
                localStorage.removeItem('product');
                localStorage.setItem('product',JSON.stringify(temp));
            } 
        }
    }
    
}
function change1(prodid, price1) {
    var cart =JSON.parse(localStorage.getItem('product'));
    if(cart){
        for( var j = 0; j < cart.length; j++)
        {
            if(cart[j].productId === prodid)
            {
                var final= "total"+prodid;
                var x= document.getElementById(prodid).value;
                cart[j].quantity= x;
                cart[j].total = price1*x;
                document.getElementById(final).innerHTML=price1*x;
                localStorage.setItem('product',JSON.stringify(cart));
                cal();
            } 
        }
}
}
// $('.btn').click(function(){
//     // $('.con1').html('');
//     $('.card-title').text("loading....");
// })
// <button type="button" class="col-3 btn btn-primary float-left" href="shoppingbasket.html" data-bs-toggle="offcanvas" data-bs-target="#shoppingCart" aria-controls="shoppingCart>Add to cart</button>