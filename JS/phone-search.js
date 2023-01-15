const loadData = () => {
    const searchText = document.getElementById('search-field').value;
    // Fetching data
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data))
    
    // Clearing input field
    document.getElementById('search-field').value = '';
}

const displaySearchResult = results => {
    // console.log(results);
    const containerDiv = document.getElementById('container');
    // Clearing Previous Result
    containerDiv.textContent = '';

    if(results.length === 0) {
        document.getElementById('no-result').setAttribute('class', 'd-block');
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
                    <button onclick="loadDetailInfo('${result.slug}')" class="btn btn-primary" type="submit">Details</button>
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
    console.log(details);
}