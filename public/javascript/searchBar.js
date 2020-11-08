let searchMenuContainer;
window.addEventListener('click', () => {
    searchMenuContainer.innerHTML = ''
})

window.addEventListener('DOMContentLoaded', () => {
    searchMenuContainer = document.querySelector('#search-menu-container');
    searchMenuContainer.addEventListener('click', (e) => e.stopPropagation());

    let searchInput = document.querySelector('#search-input');
    let ref;
    searchInput.addEventListener('input', (e) => {
        const input = e.target.value;
        if (ref) {
            clearTimeout(ref);
        }        
        ref = setTimeout(() => {
            axios.get('/users?search=' + input)
                .then(res => {
                    searchMenuContainer.innerHTML = res.data
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        }, 2000)
    })
})