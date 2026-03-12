const nameEl = document.getElementById('name');
const amountEl = document.getElementById('amount');
const categoryEl = document.getElementById('category');
const addBtn = document.getElementById('addBtn');
const updateBtn = document.getElementById('updateBtn');
const clearBtn = document.getElementById('clearBtn');
const expenseBody = document.getElementById('expenseBody');
const totalEl = document.getElementById('total');

let items = [];  
let editingId = null;
function render() {
  expenseBody.innerHTML = '';
  let sum = 0;
  items.forEach(it => {
    sum += Number(it.amount);
    const tr = document.createElement('tr');
    
    const tdName = document.createElement('td');
    tdName.textContent = it.name;
    tr.appendChild(tdName);

    const tdCat = document.createElement('td');
    tdCat.textContent = it.category;
    tr.appendChild(tdCat);

    const tdAmt = document.createElement('td');
    tdAmt.textContent = 'Rs. ' + Number(it.amount).toFixed(2);
    tr.appendChild(tdAmt);

    const tdAct = document.createElement('td');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'btn';
    editBtn.onclick = () => startEdit(it.id);
    tdAct.appendChild(editBtn);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'btn';
    delBtn.onclick = () => removeItem(it.id);
    tdAct.appendChild(delBtn);

    tr.appendChild(tdAct);
    expenseBody.appendChild(tr);
  });

  totalEl.textContent = 'Rs. ' + Number(sum).toFixed(2);
}

function addItem() {
  const name = nameEl.value.trim();
  const amount = parseFloat(amountEl.value);
  const category = categoryEl.value;
  
  if (!name) { alert('Enter expense name'); nameEl.focus(); return; }
  if (isNaN(amount) || amount <= 0) { alert('Enter a valid amount'); amountEl.focus(); return; }
  items.push({ id: Date.now().toString(36), name, amount: Number(amount.toFixed(2)), category });
  resetForm();
  render();
}

function startEdit(id) {
  const it = items.find(x => x.id === id);
  if (!it) return;
  editingId = id;
  nameEl.value = it.name;
  amountEl.value = it.amount;
  categoryEl.value = it.category;
  addBtn.style.display = 'none';
  updateBtn.style.display = 'inline-block';
}

function updateItem() {
  if (!editingId) return;
  const name = nameEl.value.trim();
  const amount = parseFloat(amountEl.value);
  const category = categoryEl.value;

  if (!name) { alert('Enter expense name'); nameEl.focus(); return; }
  if (isNaN(amount) || amount <= 0) { alert('Enter a valid amount'); amountEl.focus(); return; }

  const idx = items.findIndex(x => x.id === editingId);
  if (idx === -1) return;
  items[idx].name = name;
  items[idx].amount = Number(amount.toFixed(2));
  items[idx].category = category;

  resetForm();
  render();
}

function removeItem(id) {
  if (!confirm('Delete this expense?')) return;
  items = items.filter(x => x.id !== id);
  if (editingId === id) resetForm();
  render();
}

function resetForm() {
  editingId = null;
  nameEl.value = '';
  amountEl.value = '';
  categoryEl.value = 'Food';
  addBtn.style.display = 'inline-block';
  updateBtn.style.display = 'none';
}

addBtn.addEventListener('click', addItem);
updateBtn.addEventListener('click', updateItem);
clearBtn.addEventListener('click', resetForm);
amountEl.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    editingId ? updateItem() : addItem();
  }
});
render();