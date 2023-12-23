
fetch('https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json')
    .then(response => response.json())
    .then(data => {

        const itemsPerPage = 10;
        const totalPages = Math.ceil(data.length / itemsPerPage);


        let currentPage = 1;


        function updateData() {
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const currentData = data.slice(startIndex, endIndex);


            const dataContainer = document.getElementById('data-container');
            dataContainer.innerHTML = '';
            const table = document.createElement('table');


            const thead = document.createElement('thead');
            const headerRow = document.createElement('tr');
            const headers = Object.keys(currentData[0]);
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            table.appendChild(thead);


            const tbody = document.createElement('tbody');
            currentData.forEach(item => {
                const row = document.createElement('tr');
                headers.forEach(header => {
                    const td = document.createElement('td');
                    td.textContent = item[header];
                    row.appendChild(td);
                });
                tbody.appendChild(row);
            });
            table.appendChild(tbody);

            dataContainer.appendChild(table);
        }


        function updatePagination() {
            const paginationContainer = document.getElementById('pagination');
            paginationContainer.innerHTML = '';

            for (let i = 1; i <= totalPages; i++) {
                const li = document.createElement('li');
                li.textContent = i;
                li.addEventListener('click', () => {
                    currentPage = i;
                    updatePagination();
                    updateData();
                });

                if (i === currentPage) {
                    li.classList.add('active');
                }

                paginationContainer.appendChild(li);
            }
        }


        updatePagination();
        updateData();
    })
    .catch(error => console.error('Error fetching JSON data:', error));
