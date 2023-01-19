// function for spinner when loading data
const spinner = show => {
    if(show === true) {
        document.getElementById('spinner').classList.remove('d-none');
    }
    else {
        document.getElementById('spinner').classList.add('d-none');
    }
}

const loadData = () => {
    spinner(true); // Loading Spinner
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
    
    // Showing 'No Result Found' message 
    if(results.length === 0) {
        // console.log(results.length);
        document.getElementById('no-result').setAttribute('class', 'd-block');
        spinner(false); // Loading Spinner
        // document.getElementById('detail-info').textContent = '';
    }
    else {
        document.getElementById('no-result').setAttribute('class', 'd-none');
    }

    // Display only 20 phones
    const phoneSliced = results.slice(0, 20);
    console.log('Total numbers '+results.length);
    console.log('Phone sliced '+phoneSliced.length);
    
    phoneSliced.forEach(result => {
        // console.log(result);
        const phoneCard = document.createElement('div');
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
        spinner(false); // Loading Spinner
    })
    // Enabling "Show All" Button
    document.getElementById('show-btn-container').classList.remove('d-none');
    
    // Display Remaining Phones
    document.getElementById('showAll-btn').addEventListener('click', () => {
        const remainingPhones = results.slice(20);
        console.log('Remaining phones '+remainingPhones.length);
        remainingPhones.forEach(result => {
            const phoneCard = document.createElement('div');
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
            spinner(false); // Loading Spinner
        })
        // Disabling "Show All" Button
        document.getElementById('showAll-btn').setAttribute('disabled', true);
    })
}

// Loading Detail info of the specific phone
const loadDetailInfo = phoneId => {
    // Fetching phone detail url
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
    .then(res => res.json())
    .then(data => displayDetailInfo(data.data))
}

const displayDetailInfo = details => {
    const detailInfoDiv = document.getElementById('detail-info');
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
    // Adding Sensors Info to the mainfeatures of the phone details 
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
    // Adding others info to the phone details
    const othersInfo = document.createElement('div');
    detailInfoDiv.appendChild(othersInfo);
    const others = details.others;
    othersInfo.innerHTML = `
        <div class="card-body">    
            <h5 class="card-title">Others:</h5>
            <p class="card-text">
                <p><b>Bluetooth:</b> ${others.Bluetooth}</p>
                <p><b>GPS:</b> ${others.GPS}</p>
                <p><b>NFC:</b> ${others.NFC}</p>
                <p><b>Radio:</b> ${others.Radio}</p>
                <p><b>USB:</b> ${others.USB}</p>
                <p><b>WLAN:</b> ${others.WLAN}</p>
            </p>
        </div>    
    `;
}