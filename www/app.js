let userid;
$(document).ready(async function () {
    await liff.init({ liffId: "1654476536-lVmDnNJp" }, () => { }, err => console.error(err.code, error.message));
    // await getUserid();
    loadMap();
});

async function getUserid() {
    const profile = await liff.getProfile();
    userid = await profile.userId;
    $('#profile').attr('src', await profile.pictureUrl);
    // $('#userId').text(profile.userId);
    $('#statusMessage').text(await profile.statusMessage);
    $('#displayName').text(await profile.displayName);
}

var map = L.map("map", {
    center: [16.769616, 100.198335],
    zoom: 8
});

var urlParams = new URLSearchParams(window.location.search);
var marker, gps, dataurl, tam, amp, pro, x, y;

// var url = "https://rti2dss.com:3200";
// var url = 'http://localhost:3200';

function loadMap() {
    var mapbox = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        id: 'mapbox/light-v9',
        tileSize: 512,
        zoomOffset: -1
    });

    const grod = L.tileLayer("https://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}", {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"]
    });

    const gter = L.tileLayer('https://{s}.google.com/vt/lyrs=t,m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    const ghyb = L.tileLayer("https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}", {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"]
    });

    const pro = L.tileLayer.wms("https://rti2dss.com:8443/geoserver/th/wms?", {
        layers: "th:province_4326",
        format: "image/png",
        transparent: true
    });


    const baseMap = {
        Mapbox: mapbox.addTo(map),
        "google Hybrid": ghyb
    };

    const overlayMap = {
        ขอบจังหวัด: pro.addTo(map)
    };
    L.control.layers(baseMap, overlayMap).addTo(map);



    // var baseMap = {
    //     'สีเทา': mapbox.addTo(map),
    //     'ภูมิประเทศ': gter,
    //     'แผนที่ถนน': grod,
    //     'ภาพดาวเทียม': ghyb
    // };

    // layerControl = L.control.layers(baseMap).addTo(map);
    // layerControl.addOverlay(pro.addTo(map), '<img src="http://rti2dss.com:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=th:province_4326" /> จังหวัด');

}



/*Legend specific*/
var legend = L.control({ position: "bottomleft" });

function showLegend() {
    legend.onAdd = function (map) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += `<button class="btn btn-sm" onClick="hideLegend()">
      <span class="kanit">ซ่อนสัญลักษณ์</span><i class="fa fa-angle-double-down" aria-hidden="true"></i>
    </button><br>`;
        // div.innerHTML += "<h4>Tegnforklaring</h4>";
        div.innerHTML += '<i style="background: #008c4b"></i><span class="kanit">อาจจะมีฝน</span><br>';
        // div.innerHTML += '<i style="background: #008c4b"></i><span class="kanit">อาจจะมีฝนเล็กน้อย</span><br>';
        div.innerHTML += '<i style="background: #00d319"></i><span class="kanit">ฝนเล็กน้อย</span><br>';
        div.innerHTML += '<i style="background: #21fd22"></i><span class="kanit">ฝนเล็กน้อย</span><br>';
        div.innerHTML += '<i style="background: #fffd1b"></i><span class="kanit">ฝนปานกลาง</span><br>';
        div.innerHTML += '<i style="background: #ffd400"></i><span class="kanit">ฝนปานกลาง</span><br>';
        div.innerHTML += '<i style="background: #ffab00"></i><span class="kanit">ฝนตกหนัก</span><br>';
        div.innerHTML += '<i style="background: #ff6e00"></i><span class="kanit">ฝนตกหนัก</span><br>';
        div.innerHTML += '<i style="background: #d00523"></i><span class="kanit">พายุ</span><br>';
        div.innerHTML += '<i style="background: #ff00ff"></i><span class="kanit">ลูกเห็บ</span><br>';
        // div.innerHTML += '<i style="background: #bd0000"></i><span class="kanit">ฝนตกหนักมาก</span><br>';
        return div;
    };
    legend.addTo(map);
}

function hideLegend() {
    legend.onAdd = function (map) {
        var div = L.DomUtil.create('div', 'info legend')
        div.innerHTML += `<button class="btn btn-sm" onClick="showLegend()">
        <small class="prompt"><span class="kanit">แสดงสัญลักษณ์</span></small> 
        <i class="fa fa-angle-double-up" aria-hidden="true"></i>
    </button><br> `;
        return div;
    };
    legend.addTo(map);
}

hideLegend()