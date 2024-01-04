const scriptURL = 'https://script.google.com/macros/s/AKfycbzujDtQLQf8Sp_-TUpriLDNhU-HgyJzxHz9YXovlrP4wiDc5DgyRgzkOBSQpuYC4sh6/exec'


const form = document.forms['contact-form']

form.addEventListener('daftar', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => alert("Terima Kasih telah mendaftar!" ))
    .then(() => { window.location.reload(); })
    .catch(error => console.error('Error!', error.message))
})