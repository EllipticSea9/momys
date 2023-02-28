import {auth, provider,db} from './fb.js'
import {getAuth, signInWithPopup, GoogleAuthProvider,signOut,onAuthStateChanged  } from 'https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js'

var bodys=document.getElementById('base1');
onAuthStateChanged(auth, (user) => {
if (user && location.pathname=='/info-bb.html'){
bodys.innerHTML=/*html*/`
<div class="text-end pt-1" >
<a type="button" class="btn btn-primary" href="./formularios.html">
+ Editar Datos
</a>
</div>
<div class="conta">
<div class="accordion" id="accordionExample">
<div class="accordion-item">
  <h2 class="accordion-header" id="headingOne">
    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      Datos del bebé
    </button>
  </h2>
  <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
    <div class="accordion-body">
      <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
    </div>
  </div>
</div>
<div class="accordion-item">
  <h2 class="accordion-header" id="headingTwo">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      Accordion Item #2
    </button>
  </h2>
  <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
    <div class="accordion-body">
      <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
    </div>
  </div>
</div>
<div class="accordion-item">
  <h2 class="accordion-header" id="headingThree">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      Accordion Item #3
    </button>
  </h2>
  <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
    <div class="accordion-body">
      <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
    </div>
  </div>
</div>
</div>
<!--no cerrar-->
</div>`
          const userDocRef1 = doc(db, "datos-bebe", user.uid);
          const vacunasCollectionRef1 = collection(userDocRef1, "vacunas");
          const orderedVacunasCollectionRef = query(vacunasCollectionRef1, orderBy("fechaVacuna", "desc"));
          document.getElementById('mostrar_vacunas').addEventListener('click', function () {
            getDocs(orderedVacunasCollectionRef).then((querySnapshot) => {
              document.getElementById('lista_Vac').innerHTML ='';
              querySnapshot.forEach((doc) => {
                //console.log(doc.id, " => ", doc.data());
                document.getElementById('lista_Vac').innerHTML += /*html*/`
                <div class="alert alert-warning alert-dismissible fade show" id="${doc.id}" role="alert" >
                <strong>${doc.data().nombre}</strong> Se vacuno ${doc.data().fechaVacuna} en ${doc.data().lugarAplicacion} con ${doc.data().nombreAplicador}
                <button type="button" class="btn-close vacunas" data-bs-dismiss="alert" aria-label="Close" id="${doc.id}"></button>
              </div>`;
              });
              var bye=(a,b)=>{
                alert(a);
              }
            }).catch((error) => {
              console.log("Error getting documents:", error);
            })
          });
}else if(location.pathname=='/info-bb.html'){
  bodys.innerHTML=/*html*/`<div class="card bg-danger bg-opacity-75 text-center">
  <div class="card-header">
    Fallo de sesión
  </div>
  <div class="card-body">
    <h5 class="card-title">Aún no inicia sesión</h5>
    <p class="card-text">Debes iniciar sesión para poder acceder al contenido.</p>
  </div>
</div>`
}
})