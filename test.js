let dim =  new Dim("enter","leave")

console.log(dim)

dim.dim_load()

window.addEventListener("route_change", function(obj){
    console.log(obj.detail.route)
})