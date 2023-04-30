console.log("script loaded")
async function loadJSON(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) success(JSON.parse(xhr.responseText));
            } else {
                if (error) error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}
const getCarte = () => {
    return new Promise((resolve, reject) => loadJSON('data/carte.json', function (data) {
        let aperitifs = data.aperitifs
        let plats = data.plats
        let boissons = data.boissons
        let desserts = data.desserts
        resolve([aperitifs, plats, boissons, desserts]);
    }, function (xhr) {
        reject(xhr);
    })
    );
}
const createCarteDOM = (carte) => {
    carte.forEach((m, i) => {


        let categoryDisplay = ""
        let categoryList = []

        switch(i) {
            case 0:
                categoryDisplay = "Apéritifs"
                m.champignons.forEach(item => {
                    let newItem = {
                        name: item,
                        description: ""
                    }
                    categoryList.push(newItem)
                })
                m.sansChampignons.forEach(item => {
                    let newItem = {
                        name: item
                    }
                    categoryList.push(newItem)
                })
                break;
            case 1:
                categoryDisplay = "Plats"
                m.champignons.forEach(item => {
                    let newItem = {
                        name: item
                    }
                    categoryList.push(newItem)
                })
                m.sansChampignons.forEach(item => {
                    let newItem = {
                        name: item
                    }
                    categoryList.push(newItem)
                })
                break;
            case 2:
                categoryDisplay = "Boissons"
                m.alcool.forEach(item => {
                    let newItem = {
                        name: item
                    }
                    categoryList.push(newItem)
                })
                
                break;
            case 3:
                categoryDisplay = "Desserts"
                m.forEach(item => {
                    let newItem = {
                        name: item
                    }
                    categoryList.push(newItem)
                })
                break;
        }
        
        let carteLayout = document.getElementById("carte-layout")

        let category = document.createElement('div')
        let categoryName = document.createElement('div')
        category.classList = "category"
        
        categoryName.classList = "name"
        categoryName.innerText = categoryDisplay
        category.append(categoryName)

        categoryList.forEach(el => {
            let article = document.createElement("article")
            article.innerHTML = `
                <p>${el.name}</p>
            `
            category.append(article)
        });
        carteLayout.append(category)
    })
}
const init = async () => {
    const data = getCarte();
    let infos;
    await data.then(a => infos = a)
    if(infos) {
        createCarteDOM(infos)
    }
}

let responsiveNavBtn = document.getElementById('responsive-menu-btn')
let responsiveNav= document.getElementById('responsive-nav')
responsiveNavBtn.addEventListener('click', (e) => {
    responsiveNav.classList.toggle('active')
})

init()