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
                            data-bs-toggle="offcanvas" data-bs-target="#shoppingCart" aria-controls="shoppingCart" onclick="myfunc1('${path1[i].productId}',)">add to cart</a>
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
    console.log(ans);
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
                if(x === ans)
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
                            <input type="number" class="form-control" id="pass" value="1" min="1" onchange="change1(${path1[i].price})"></input>
                        </td>
                        <td class="col-sm-1 col-md-1 text-center">
                            <strong>${path1[i].price}</strong>
                        </td>
                        <td  class="col-sm-1 col-md-1 text-center">
                        <strong id="total">${path1[i].price}</strong></td>
                        <td class="col-sm-1 col-md-1">
                        <a type="button" class="btn btn-danger" onclick="clear2(${path1[i].price})">
                            X
                        </a>
                    </td>
                    </tr>
                    `;
    
                }
            }
            $('.insert').append(obj2);
        }
    })
}
function clear1(){
    $('.insert').html('');
}
function clear2(name){
    var table = document.getElementById("mytable");
    // for (let i in table.rows) {
    //     let row = table.rows[i];
    //     let col = row.cells; 
            $('tr').html("");
// }
}

function change1(price1) {
  var x = document.getElementById("pass").value;
  document.getElementById("total").innerHTML = price1*x;
}
// $('.btn').click(function(){
//     // $('.con1').html('');
//     $('.card-title').text("loading....");
// })
// <button type="button" class="col-3 btn btn-primary float-left" href="shoppingbasket.html" data-bs-toggle="offcanvas" data-bs-target="#shoppingCart" aria-controls="shoppingCart>Add to cart</button>