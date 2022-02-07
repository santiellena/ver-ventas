# How to send data from API to APP...

##### All queries except login need the TOKEN session as parameter. 

#### AUTH

> Login
>> **Receive:** {"username", "password"}.<br>
>> **Return:** Access TOKEN or ERROR (being null an internal one and false an no match of data).
>

<br>

#### BUYS

> Get All Buys
>> **Receive:** TOKEN.<br>
>> **Return:** buys: [{ id: INT, date: 'yyyy-mm-dd', emplooy: {id: INT, name: 'XXXX'}, branch: 'branchName', supplier: {id: INT, name: 'supplierName'}, howPaid: 'description', details: [{ product: 'productDesc', quantity: NUMBER, price: FLOAT }], {**same content as the last object at the same depth level**}] }, {**same content as the last object at the same depth level**}].
>

> Get Buy
>> **Receive:** TOKEN and idBuy.<br>
>> **Return:** buy: { id: INT, date: 'yyyy-mm-dd', emplooy: {id: INT, name: 'XXXX'}, branch: 'branchName', supplier: {id: INT, name: 'supplierName'}, howPaid: 'description', details: [{ product: 'productDesc', quantity: NUMBER, price: FLOAT }].
>

> Get Buys by Date (Already developed, it's not necessary to develop this function in the API)
>>  **Receive:** {TOKEN, fromDate, toDate}<br>
>> **Return:** buysByDate: [{ id: INT, date: 'yyyy-mm-dd', emplooy: {id: INT, name: 'XXXX'}, branch: 'branchName', supplier: {id: INT, name: 'supplierName'}, howPaid: 'description', details: [{ product: 'productDesc', quantity: NUMBER, price: FLOAT }], {**same content as the last object at the same depth level**}] }, {**same content as the last object at the same depth level**}].
>

> Get Buy Detail
>> **Receive:** TOKEN and idBuy .<br>
>> **Return:** [{ product: 'productDesc', quantity: NUMBER, price: FLOAT }, {}, {}].
>

> Add Buy
>> **Receive:** { supplierId: INT, emplooyId: INT, branchId: INT, howPaid: 'XXX', details: [{ product: 'productDesc', quantity: NUMBER, price: FLOAT }, {}], amount: FLOAT, date: 'yyyy-mm-dd' }.<br>
>> **Return:** buy: { supplier: {id: INT, name: ''}, emplooy: {id: INT, name: ''}, branch: 'branchName', howPaid: '', details: [{ product: 'productDesc', quantity: NUMBER, price: FLOAT }, {}], amount: FLOAT, date: 'yyyy-mm-dd' }.
>

> Delete Buy
>> **Receive:** TOKEN and buyId.<br>
>> **Return:** buyId or nothing.
>

<br>

####  Cash Flow

> Get All Registers
>> **Receive:** TOKEN.<br>
>> **Return:** registers: [{ id: INT, date: 'yyyy-mm-dd', emplooy: {id: INT, name: 'XXX'}, amount: FLOAT, operation: 'IN/OUT', observation: 'something', box: INT }, {}].
>

> Add Register
>> **Receive:** {data: {date: 'yyyy-mm-dd', emplooyId: INT, amount: FLOAT, operation: 'IN/OUT', observation: 'something', boxId: INT, branchID: INT }, TOKEN}.<br>
>> **Return:** {date: 'yyyy-mm-dd', emplooy: {id: INT, name: 'XXX'}, amount: FLOAT, operation: 'IN/OUT', observation: 'something', boxId: INT }.
>

<br>

#### Cash Register

> New Box
>> **Receive:** {TOKEN, idBranch}.<br>
>> **Return:** {idBranch, idBox, amount}.
>

> Substract to Box
>> **Receive:** { data: {idBox, idBranch, lessAmount}, TOKEN}.<br>
>> **Return:** {idBox, idBranch, moneyAmount}.
>

> Add to Box
>> **Receive:** {TOKEN, data: {idBox, idBranch, plusAmount}}.<br>
>> **Return:** {idBox, idBranch, moneyAmount}.
>

<br>

#### Customers

> Get All Customers
>> **Receive:** {TOKEN}.<br>
>> **Return:** { data: [{id: INT, name: 'XXX', numDoc: INT, docType: {id: INT, description: 'XXX'}, email: 'aaa@aaa.sth', phoneNumber: INT, dirDepto: {id: INT, nombre: 'XXX'}, dirProv: {id: INT, nombre: 'XXX'}, dirPostCode: INT, dirCity: {id: INT, nombre: 'XXX'}, dirStreet: 'XXX', cuit: INT, debts: FLOAT}, {}] }.
>

> Get Customer
>> **Receive:** {TOKEN, idBuy}.<br>
>> **Return:** {id: INT, name: 'XXX', numDoc: INT, docType: {id: INT, description: 'XXX'}, email: 'aaa@aaa.sth', phoneNumber: INT, dirDepto: {id: INT, nombre: 'XXX'}, dirProv: {id: INT, nombre: 'XXX'}, dirPostCode: INT, dirCity: {id: INT, nombre: 'XXX'}, dirStreet: 'XXX', cuit: INT, debts: FLOAT}.
>

> Add To Debt
>> **Receive:** { TOKEN, data: {idCustomer, debt} }.<br>
>> **Return:** {message}.
>

> Substract / Remove from Debts
>> **Receive:** { TOKEN, data: {idCustomer, amount} }.<br>
>> **Return:** {message}.
>

> Add Customer
>> **Receive:** {TOKEN, data: {name: 'XXX', docTypeId: INT, numDoc: INT, cuit: INT, phoneNumber: INT, dirProvId: INT, dirDeptoId: INT, dirPostCode: INT, dirCityId: INT, dirStreet: 'XXX', debts: FLOAT}}.<br>
>> **Return:** {id: INT, name: 'XXX', numDoc: INT, docType: {id: INT, description: 'XXX'}, email: 'aaa@aaa.sth', phoneNumber: INT, dirDepto: {id: INT, nombre: 'XXX'}, dirProv: {id: INT, nombre: 'XXX'}, dirPostCode: INT, dirCity: {id: INT, nombre: 'XXX'}, dirStreet: 'XXX', cuit: INT, debts: FLOAT}.
>

> Edit Customer
>> **Receive:** {TOKEN, data: { id: INT, name: 'XXX', docTypeId: INT, numDoc: INT, cuit: INT, phoneNumber: INT, dirProvId: INT, dirDeptoId: INT, dirPostCode: INT, dirCityId: INT, dirStreet: 'XXX', debts: FLOAT }}.<br>
>> **Return:** { id: INT, name: 'XXX', numDoc: INT, docType: {id: INT, description: 'XXX'}, email: 'aaa@aaa.sth', phoneNumber: INT, dirDepto: {id: INT, nombre: 'XXX'}, dirProv: {id: INT, nombre: 'XXX'}, dirPostCode: INT, dirCity: {id: INT, nombre: 'XXX'}, dirStreet: 'XXX', cuit: INT, debts: FLOAT }.
>

> Delete Customer
>> **Receive:** { TOKEN, idCustomer }.<br>
>> **Return:** {message}.

<br>

#### Debt Payments

> Add Payment
>> **Receive:** {TOKEN, data: {emplooyId: INT, customerId: INT, amount: FLOAT, observation: 'XXX', howPaid: 'XXX', date: 'yyyy-mm-dd'}}.<br>
>> **Return:** {id: INT, date: 'yyyy-mm-dd', emplooy: {id: INT, name: 'XXX'}, customer: {id: INT, name: 'XXX'}, anount: FLOAT, observation: 'XXX', howPaid: 'XXX'}.

> Get Payments By Customer
>> **Receive:** {TOKEN, idCustomer}.<br>
>> **Return:** {payments: [{id: INT, date: 'yyyy-mm-dd', emplooy: {id: INT, name: 'XXX'}, customer: {id: INT, name: 'XXX'}, anount: FLOAT, observation: 'XXX', howPaid: 'XXX'}, {}]}.

<br>

#### Departments (products)

> Get All Departments
>> **Receive:** { TOKEN }.<br>
>> **Return:** {departments: [{id: INT, description: 'XXX'}, {}]}.

> Get Department
>> **Receive:** {TOKEN, idDepartment}.<br>
>> **Return:** {department: {id: INT, description: 'XXX'}}.

> Add Department
>> **Receive:** { TOKEN, data: {description: 'XXX'} }.<br>
>> **Return:** {department: {id: INT, description: 'XXX'}}.

> Delete Department
>> **Receive:** {TOKEN, data: {idDepartment: INT}}.<br>
>> **Return:** {message}.

<br>

#### Directions

> Get All Provinces
>> **Receive:** {TOKEN}.<br>
>> **Return:** {provincias: [{nombre_completo: 'XXX', fuente: 'IGN', iso_id: 'AR-N', nombre: 'XXX', id: 'XX', categoria: 'Provincia', iso_nombre: 'XXX', centroide: {lat: FLOAT, lon: FLOAT}}, {} ]}.

> Get All Departments
>> **Receive:** {TOKEN}.<br>
>> **Return:** {departamentos: [{nombre_completo: 'XXX', fuente: 'XXX', nombre: 'XXX', id: '002434', provincia: { nombre: 'XXX', id: '06', interseccion: FLOAT }, categoria: 'XXX', centroide: lat: FLOAT, lon: FLOAT }, ]}.

> Get All Cities
>> **Receive:** {TOKEN}.<br>
>> **Return:** {localidades: [{
    categoria: 'XXX', fuente: 'XXX', municipio: { nombre: 'XXX', id: 'XXX' },departamento: { nombre: 'XX', id: 'XXx' }, nombre: 'XXX', id: 'XXX', provincia: { nombre: 'XXX', id: 'XX' }, localidad_censal: { nombre: 'XXX', id: 'XxX' }, centroide: { lat: FLOAT, lon: FLOAT }}, {}]}.

> Get Departments By Province
>> **Receive:** {TOKEN, idProvince}.<br>
>> **Return:** {departments: [{same objects as GET ALL DEPARMENTS}, {}]}.

> Get Cities by Department
>> **Receive:** {TOKEN, idDepartment}.<br>
>> **Return:** {cities: [{same object as GET ALL CITIES}, {}]}.

> Get Department
>> **Receive:** {TOKEN, idDepartment}.<br>
>> **Return:** { same objects as GET ALL DEPARMENTS }.

> Get City
>> **Receive:** {TOKEN, idCity}.<br>
>> **Return:** { same object as GET ALL CITIES }.

> Get Province
>> **Receive:** {TOKEN, idProvince}.<br>
>> **Return:** { same object as GET ALL PROVINCES }.

<br>

#### Doc Types

> Get All Doc Types
>> **Receive:** {TOKEN}.<br>
>> **Return:** {docTypes: [{id: INT, description: 'XXX'}, {}]}.

> Get Doc Type
>> **Receive:** {TOKEN, idDocType}.<br>
>> **Return:** {id: INT, description: 'XXX'}.

> Add Doc Type
>> **Receive:** {TOKEN, newName: 'XXX'}.<br>
>> **Return:** {id: INT, description: 'XXX'}.

> Delete Doc Type
>> **Receive:** {TOKEN, idDocType}.<br>
>> **Return:** {message}.

<br>

#### Employees

> Get Employees
>> **Receive:** {TOKEN}.<br>
>> **Return:** .

> Get Emplooy
>> **Receive:** .<br>
>> **Return:** .

> New Emplooy
>> **Receive:** .<br>
>> **Return:** .

> Update Emplooy
>> **Receive:** .<br>
>> **Return:** .

> Delete Emplooy
>> **Receive:** .<br>
>> **Return:** .

> Check Emplooy ID
>> **Receive:** .<br>
>> **Return:** .

> Get Employees To User
>> **Receive:** .<br>
>> **Return:** .