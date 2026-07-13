const mapElement = document.getElementById("map");

if (mapElement) {
    const map = L.map("map").setView(
        [coordinates[1], coordinates[0]],
        15
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    // Custom Home Marker
    const homeIcon = L.icon({
        iconUrl: "/images/marker.png",
        iconSize: [48, 48],
        iconAnchor: [24, 48],
        popupAnchor: [0, -42],
    });

    // Highlight Area
    L.circle([coordinates[1], coordinates[0]], {
        radius: 250,
        color: "#FF385C",
        fillColor: "#FF385C",
        fillOpacity: 0.10,
        weight: 1,
    }).addTo(map);

    // Marker + Popup
    const popupContent = `
        <div style="text-align:center; min-width:180px;">
            <h6 style="margin-bottom:5px; font-weight:700;">
                ${listingTitle}
            </h6>
            <small style="color:#666;">
                Exact location shared after booking.
            </small>
        </div>
    `;

    L.marker([coordinates[1], coordinates[0]], {
        icon: homeIcon,
    })
    .addTo(map)
    .bindPopup(popupContent, {
        closeButton: false,
        autoClose: false,
        closeOnClick: false,
    })
    .openPopup();
}