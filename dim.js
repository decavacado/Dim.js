/* Dim.js 
   Made by Declan Amoako

   2020

*/



//Function that does stuff with the history API

function pushHistory(title, url, name, data){
    console.log(name)
    console.log(url)
    history.pushState({url: url, name: name, data: data}, "Test", name)
    sessionStorage.setItem("dim_location", url)
    sessionStorage.setItem("dim_route", name)
    sessionStorage.setItem("dim_content", JSON.stringify(data))
    console.log(url)
}



class Dim {
    constructor(anim_class="",leave_class="",base_route=""){
        this.anim_class = anim_class
        this.leave_class = leave_class
    }
    //Function meant to be recursively called when a element has children 
    dim_cre(e, children){

        for(let i of  Array.from(children)){
            console.log(children)
            if(i.classList.contains("dim_ex") || i.classList.contains("dim_link")){
                console.log("excluded")
                console.log(i.children.length)
                if(i.classList.contains("dim_ex") && i.children.length){
                    console.log(i)
                    this.dim_cre(i, i.children)
                }
            }else {
                if(i.children.length){
                    this.dim_cre(i, i.children)
                }else {
                    console.log(i)
                    e.removeChild(i)
                }
            }
        }

        console.log(e)
        if(e.classList.contains("dim_ex")){
            console.log(e)
        }else {
            e.remove()
        }
    }

    dim_render(obj){
        //body rendering 
        let body = document.body
        let head = document.head

        for(let e of Array.from(body.children)){
            if(e.classList.contains("dim_ex") || e.classList.contains("dim_link")){
                console.log("excluded")
                console.log(e.children.length)
                if(e.classList.contains("dim_ex") && e.children.length){
                    this.dim_cre(e, e.children)
                }
            }else {
                let that = this
                console.log("removed")
                if(this.leave_class){
                    e.classList.add(this.leave_class)
                    e.addEventListener("webkitAnimationEnd", function(){
                        this.classList.remove(that.leave_class)
                        e.remove()
                    })
                }else {
                    e.remove()
                }
            }
        }

        //Deleting links of dim_link
        let links = document.getElementsByClassName("dim_link")
        for(let e of Array.from(links)){
            if(e.classList.contains("dim_linkex")){
                console.log("Not removed")
            }else {
                console.log("Link removed")
                e.remove()
            }
        }

        //Replaces to defined elements happen here. THis part of the function replaces elements in the dom.
        for(let i of obj.replaces){
            let element = document.getElementById(i.id)
            if(element){
                element.outerHTML = i.content
            }else {
                console.warn("Make sure you have an element with the tag ", i.id)
            }
        }

        //Adding of new content happens here. This part of the function takes things from content and parses then adds it to the dom before your last element usually a script
        if(obj.content){
            let parser = new DOMParser()
            let last_el = document.body.lastElementChild
            console.log(obj.content)
            let html = parser.parseFromString(obj.content, "text/html")
            console.log(html)
            for(let i of Array.from(html.body.children)){
                console.log(i)
                let that = this
                body.insertBefore(i, last_el)
                if(this.anim_class){
                    i.classList.add(this.anim_class)
                    i.addEventListener("webkitAnimationEnd", function(){
                        this.classList.remove(that.anim_class)
                        console.log(this)
                    })
                }
            }
        }else {
            console.dir(document.body)
        }
        
        //head rendering. This part of the function renders thing from the head property 
        console.log(obj)
        for(let e of Array.from(head.children)){
            if(e.classList.contains("dim_ex") || e.classList.contains("dim_link")){
                console.log("excluded")
                console.log(e.children.length)
                if(e.classList.contains("dim_ex") && e.children.length){
                    this.dim_cre(e, e.children)
                }
            }else {
                console.log(e)
                console.log("removed")
                e.remove()
            }
        }
        if(obj.head){
            let parser = new DOMParser()
            let html = parser.parseFromString(obj.head, "text/html")
            for(let i of Array.from(html.head.children)){
                head.appendChild(i)
            }
        }else {
            console.dir(document.body)
        }
        
        let route_change_event = new CustomEvent("route_change",
        {
            detail: {
                route: window.location
            }
        }
        )

        window.dispatchEvent(route_change_event)
    }

    dim_load(){
        if(sessionStorage.getItem("dim_content")){
            console.log(window.location)
            if(window.location.pathname + window.location.search === sessionStorage.getItem("dim_route")){
                let data = JSON.parse(sessionStorage.getItem("dim_content"))
                this.dim_render(data)
            }
        }
        let dims = document.getElementsByClassName("dim_link")
        let that = this
        window.addEventListener("popstate", function(e){
            let state = e.state
            if(state){
                sessionStorage.setItem("dim_location", state.url)
                sessionStorage.setItem("dim_route", state.name)
                sessionStorage.setItem("dim_content", JSON.stringify(state.data))
                console.log(state)
            }
            if(state){
                fetch(state.url)
                    .then(function(res){
                        return res.json()
                    })
                    .then(function(data){
                        that.dim_render(data)
                    })
            }else {
                console.log(window.location)
                let temp = window.location.href
                window.location.href = temp
                console.log(temp)
            }
        })
        //Finding elements with the class dim_link and adding a click event to them
        for(let link of dims){
            link.addEventListener("click", function(e){
                e.preventDefault()
                let linko = this
                fetch(this.href)
                    .then(function(res){
                        return res.json()
                    })
                    .then(function(data){
                        pushHistory("",linko.href,"/" + linko.getAttribute("linket"), data)
                        this.dim_render(data)
                    }.bind(that))
            })
            console.log(link)
        }
    }
}

