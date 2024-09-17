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

    const htRaphael = {};

    // Add department paths with their respective styles
    for (const department in htMap) {
        if (htMap[department]) {
            const departmentAttr = specialDepartments.includes(department) ? hattr : attr;
            htRaphael[department] = R.path(htMap[department]).attr(departmentAttr);
        }
    }

    // Responsive viewbox & Tooltip element
    R.canvas.setAttribute('viewBox', '0 0 ' + svgWidth + ' ' + svgHeight);
    const tooltip = document.getElementById('tooltip');
    const toggleButton = document.querySelector('.toggle-button');
    let tooltipVisible = true;

    // Handle mouse events for each department
    for (const department in htRaphael) {
        (function (st, department) {
            st[0].onmouseover = function (e) {
                st.toFront();
                const deptInfo = departmentInfo[department];

                if (tooltipVisible) {
                    // Update tooltip content
                    tooltip.innerHTML = `
                        <img src="${deptInfo.img}" alt="${deptInfo.name}" />
                        <h4>${deptInfo.name}</h4>
                        <p>${deptInfo.description}</p>
                    `;

                    // Position and show the tooltip
                    tooltip.style.visibility = 'visible';
                    tooltip.style.left = (e.pageX + 15) + 'px';
                    tooltip.style.top = (e.pageY - 60) + 'px';
                }

                // Animate department on hover
                st.stop().animate({ stroke: "#747678", 'stroke-opacity': '1', "fill-opacity": "1" }, 300);
            };

            st[0].onmouseout = function () {
                // Hide the tooltip & Animate department back to normal
                if (tooltipVisible) {
                    tooltip.style.visibility = 'hidden';
                }
                st.animate({ stroke: "#fff", "fill-opacity": ".7" }, 300);
            };

            // Update department name
            st[0].onmousemove = function (e) {
                if (tooltipVisible) {
                    tooltip.style.left = (e.pageX + 15) + 'px';
                    tooltip.style.top = (e.pageY - 60) + 'px';
                }
            };
        })(htRaphael[department], department);
    }

    toggleButton.onclick = function () {
        tooltipVisible = !tooltipVisible;
        if (tooltipVisible) {
            toggleButton.textContent = 'Hide Info';
            tooltip.style.visibility = 'visible';
        } else {
            toggleButton.textContent = 'Show Info';
            tooltip.style.visibility = 'hidden';
        }
    };
};
