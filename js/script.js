// Wait for the window to load
window.onload = function () {
    const svgWidth = 1000;
    const svgHeight = 766;

    // Initialize Raphael
    const R = new Raphael("map", '100%', '100%'),
        attr = {
            fill: '#aaaaaa',
            stroke: '#fff',
            "stroke-width": 2,
            "stroke-line": "round",
            "fill-opacity": ".7",
            'stroke-opacity': '1',
            transform: "T 150 00"
        },
        hattr = {
            fill: '#395775',
            stroke: '#fff',
            "stroke-width": 2,
            "stroke-line": "round",
            "fill-opacity": ".7",
            'stroke-opacity': '1',
            transform: "T 150 00"
        };

    // Initialize map object
    const htRaphael = {};

    // Add department paths with their respective styles
    for (const department in htMap) {
        if (htMap[department]) {
            var departmentAttr = specialDepartments.includes(department) ? hattr : attr;
            htRaphael[department] = R.path(htMap[department]).attr(departmentAttr);
        }
    }

    // Responsive viewbox & Tooltip element
    R.canvas.setAttribute('viewBox', '0 0 ' + svgWidth + ' ' + svgHeight);
    const tooltip = document.getElementById('tooltip');

    // Handle mouse events for each department
    for (const department in htRaphael) {
        (function (st, department) {
            st[0].onmouseover = function (e) {
                st.toFront();
                const deptInfo = departmentInfo[department];

                // Update tooltip content
                tooltip.innerHTML = `
                    <img src="${deptInfo.img}" alt="${deptInfo.name}" />
                    <h4>${deptInfo.name}</h4>
                    <p>${deptInfo.description}</p>
                `;

                // Position and show the tooltip
                tooltip.style.visibility = 'visible';
                tooltip.style.left = (e.pageX + 15) + 'px'; // Adjust tooltip position
                tooltip.style.top = (e.pageY - 60) + 'px';

                // Animate department on hover
                st.stop().animate({ stroke: "#747678", 'stroke-opacity': '1', "fill-opacity": "1" }, 300);
            };

            st[0].onmouseout = function () {
                // Hide the tooltip
                tooltip.style.visibility = 'hidden';

                // Animate department back to normal
                st.animate({ stroke: "#fff", "fill-opacity": ".7" }, 300);
            };

            // Update department name
            st[0].onmousemove = function (e) {
                tooltip.style.left = (e.pageX + 15) + 'px';
                tooltip.style.top = (e.pageY - 60) + 'px';
            };
        })(htRaphael[department], department);
    }
};