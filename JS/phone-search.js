const loadData = () => {
    const searchText = document.getElementById('search-field').value;
    // Fetching data
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data))
    
    // Clearing input field
    document.getElementById('search-field').value = '';
    // document.getElementById('detail-info').textContent = '';
}

const displaySearchResult = results => {
    // console.log(results);
    const containerDiv = document.getElementById('container');
    // Clearing Previous Result
    containerDiv.textContent = '';

    if(results.length === 0) {
        console.log(results.length);
        document.getElementById('no-result').setAttribute('class', 'd-block');
        // document.getElementById('detail-info').textContent = '';
    }
    else {
        document.getElementById('no-result').setAttribute('class', 'd-none');
    }
    results.forEach(result => {
        // console.log(result);
        const phoneCard = document.createElement('div');
        // phoneCard.classList.add('')
        phoneCard.innerHTML = ` 
            <div class="card">
                <div class="card-body">
                    <img src="${result.image}" class="w-25 card-img-top" alt="phone-image">
                    <h5 class="card-title">Model: ${result.phone_name}</h5>
                    <h5 class="card-text">Brand: ${result.brand}</h5>
                    <button onclick="loadDetailInfo('${result.slug}')" class="btn btn-primary fw-semibold" type="submit">Details</button>
                </div>
            </div>
        `;
        containerDiv.appendChild(phoneCard);
    })
}

const loadDetailInfo = phoneId => {
    // Fetching phone detail url
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
    .then(res => res.json())
    .then(data => displayDetailInfo(data.data))
}

const displayDetailInfo = details => {
    const detailInfoDiv = document.getElementById('detail-info');
    // console.log(details);
    detailInfoDiv.classList.add('card', 'mb-3')
    
    detailInfoDiv.innerHTML = `
        <div class="card-body">
            <img src="${details.image}" class="w-25 card-img-top mx-auto d-block" alt="phone-image">
            <h5 class="card-title">${details.releaseDate? details.releaseDate: 'No release date found'}</h5>
            <p id="main-features" class="card-text">
                <p><b>Chip Set:</b> ${details.mainFeatures.chipSet}</p>
                <p><b>Display Size:</b> ${details.mainFeatures.displaySize}</p>
                <p><b>Memory:</b> ${details.mainFeatures.memory}</p>
                <p><b>Storage:</b> ${details.mainFeatures.storage}</p> 
            </p>
        </div>
    `;
    const p = document.createElement('p');
    document.getElementById('main-features').appendChild(p);
    const sensors = details.mainFeatures.sensors;
    p.innerHTML = `<b>Sensors:</b>`;
    for (const sensor of sensors) {
        const sensonrsInfo = document.createElement('span');
        sensonrsInfo.classList.add('px-2');
        sensonrsInfo.innerText = sensor;
        p.appendChild(sensonrsInfo)
        // console.log(sensor);
    }
}