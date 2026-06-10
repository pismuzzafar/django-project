// Live search/filter
const searchInput = document.getElementById('searchInput');
const tbody = document.getElementById('membersBody');
const totalCount = document.getElementById('totalCount');
const visibleCount = document.getElementById('visibleCount');

function filterTable() {
    const query = searchInput.value.trim().toLowerCase();
    const rows = tbody.querySelectorAll('tr[data-id]');
    let visible = 0;

    rows.forEach(row => {
        const text = Array.from(row.querySelectorAll('.searchable'))
            .map(c => c.textContent.toLowerCase())
            .join(' ');
        const match = text.includes(query);
        row.style.display = match ? '' : 'none';
        if (match) visible++;
    });

    if (visibleCount) visibleCount.textContent = visible;
}

if (searchInput) {
    searchInput.addEventListener('input', filterTable);
}

// AJAX Delete
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        const name = btn.dataset.name;

        if (!confirm(`Delete member "${name}"?\nThis action cannot be undone.`)) return;

        btn.disabled = true;
        btn.textContent = 'Deleting...';

        try {
            const res = await fetch(`/delete/${id}/`, {
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': getCookie('csrftoken'),
                }
            });
            const data = await res.json();

            if (data.success) {
                const row = document.querySelector(`tr[data-id="${id}"]`);
                row.style.transition = 'opacity 0.3s';
                row.style.opacity = '0';
                setTimeout(() => {
                    row.remove();
                    // Renumber rows
                    document.querySelectorAll('#membersBody tr[data-id]').forEach((r, i) => {
                        r.querySelector('.id-cell').textContent = i + 1;
                    });
                    // Update counts
                    const remaining = document.querySelectorAll('#membersBody tr[data-id]').length;
                    totalCount.textContent = remaining;
                    visibleCount.textContent = remaining;
                    // Show empty state if needed
                    if (remaining === 0) {
                        tbody.innerHTML = `
                            <tr id="emptyRow"><td colspan="5">
                                <div class="empty-state">
                                    <div class="empty-state-icon">👥</div>
                                    <div>No team members yet. Add your first one!</div>
                                </div>
                            </td></tr>
                        `;
                    }
                }, 300);
            } else {
                alert('Delete failed: ' + (data.error || 'Unknown error'));
                btn.disabled = false;
                btn.textContent = 'Delete';
            }
        } catch (err) {
            alert('Failed to connect to server.');
            btn.disabled = false;
            btn.textContent = 'Delete';
        }
    });
});