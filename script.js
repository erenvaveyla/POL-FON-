document.addEventListener('DOMContentLoaded', function() {
    // Ana ekrandaki "Yeni Liste Oluştur" butonu
    const yeniListeBtnAna = document.getElementById('yeniListeBtn');
    if (yeniListeBtnAna) {
        yeniListeBtnAna.addEventListener('click', function() {
            window.location.href = '../yeni liste/yeni_liste.html';
        });
    }

    // Yeni liste sayfasındaki Ana Ekran butonu
    const anaEkranBtnYeni = document.getElementById('anaEkranBtn');
    if (anaEkranBtnYeni) {
        anaEkranBtnYeni.addEventListener('click', function() {
            window.location.href = '../../anasayfa/index.html';
        });
    }

    // Yeni liste sayfasındaki Liste Oluştur butonu
    const listeOlusturBtn = document.getElementById('listeOlusturBtn');
    if (listeOlusturBtn) {
        listeOlusturBtn.addEventListener('click', function() {
            const yukseklik = parseInt(document.getElementById('yukseklik').value);
            const en = parseInt(document.getElementById('en').value);

            if (isNaN(yukseklik) || isNaN(en) || yukseklik < 1 || en < 1) {
                alert('Lütfen geçerli yükseklik ve en değerleri girin.');
                return;
            }

             window.location.href = `../../malzeme listesi/malzeme_listesi.html?yukseklik=${yukseklik}&en=${en}`;
        });
    }

    // Malzeme listesi sayfasında URL parametrelerini oku ve listeyi göster
    const malzemeListesiBolumu = document.getElementById('malzemeListesiBolumu');
    const urlParams = new URLSearchParams(window.location.search);
    const yukseklikParam = urlParams.get('yukseklik');
    const enParam = urlParams.get('en');

    if (malzemeListesiBolumu && yukseklikParam && enParam) {
        const yukseklik = parseInt(yukseklikParam);
        const en = parseInt(enParam);
        const toplamPanel = yukseklik * en;
        const malzemeListesi = hesaplaMalzemeListesi(yukseklik, en, toplamPanel);

        let malzemeListesiHTML = '<h2>Malzeme Listesi</h2><ul>';
        for (const malzeme in malzemeListesi) {
            malzemeListesiHTML += `<li><span>${malzeme}:</span> ${malzemeListesi[malzeme]}</li>`;
        }
        malzemeListesiHTML += '</ul>';

        malzemeListesiBolumu.innerHTML = malzemeListesiHTML;
    } else if (malzemeListesiBolumu) {
        malzemeListesiBolumu.innerHTML = '<p>Malzeme listesi oluşturmak için lütfen ana sayfadan yükseklik ve en değerlerini girin.</p>';
    }

    // Örnek malzeme listesi hesaplama fonksiyonu
    function hesaplaMalzemeListesi(yukseklik, en, toplamPanel) {
        const demirAdet = Math.ceil(Math.max(yukseklik, en) / 1.5) * 2 + 2;
        const agirlikAdet = demirAdet * 3;
        const maviCatAdet = toplamPanel <= 10 ? 2 : toplamPanel <= 12 ? 3 : 3 + Math.floor((toplamPanel - 12) / 12);
        const yesilCatAdet = (en - 1) * yukseklik;
        const turuncuPowercomAdet = Math.ceil(toplamPanel / 10);
        const siyahPowercomAdet = Math.ceil(toplamPanel / 10);

        return {
            'Demir': demirAdet,
            'Ağırlık/Kum Torbası': agirlikAdet,
            'LED Panel': toplamPanel,
            'Mavi Cat Kablosu': maviCatAdet,
            'Yeşil Cat Kablosu': yesilCatAdet,
            'Turuncu Powercom Kablosu': turuncuPowercomAdet,
            'Siyah Powercom Kablosu': siyahPowercomAdet
        };
    }
});