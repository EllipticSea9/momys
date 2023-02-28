import { auth, provider, db } from "./fb.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import {
  getFirestore,
  query,
  orderBy,
  doc, deleteDoc, updateDoc, deleteField,
  setDoc,
  collection,
  getDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

var bodys = document.getElementById("base1");

onAuthStateChanged(auth, (user) => {

  if (user && location.pathname == "/formularios.html") {
    var docRef = doc(db, "datos-bebe", user.uid);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          var part2de1 = "";
          bodys.innerHTML = /*html*/ `
            <div class="text-end pt-1" >
              <a type="button" class="btn btn-primary" href="./info-bb.html">
                Terminar
              </a>
            </div>
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="headingOne">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Datos principales del bebé
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <!--formulario de datos generales del bebé-->
                    <form class="row g-3">
                      <div class="col-md-4">
                        <label for="validationNombre" class="form-label">Nombre(s) del bebé</label>
                        <input type="text" class="form-control" id="nombre_bebe" value="${docSnap.data().nombre
            }" required>
                </div>
                <div class="col-md-4">
                  <label for="validationApellidos" class="form-label">Apellido paterno</label>
                  <input type="text" class="form-control" id="apellido_bebe" value="${docSnap.data().apellido1
            }" required>
                </div>
                <div class="col-md-4">
                  <label for="validationApellidos2" class="form-label">Apellido materno</label>
                  <input type="text" class="form-control" id="apellido2_bebe" value="${docSnap.data().apellido2
            }" required>
              </div>
              <div class="col-md-2">
                <label for="validationEdad" class="form-label">Edad</label>
                <div class="input-group">
                  <input type="int" pattern="[0-9]+" title="Ingrese solo números" class="form-control" id="edad" value="${docSnap.data().edad
            }" required>
                  <span class="input-group-text bg-black bg-opacity-75 text-light" id="inputGroupPrepend2" >Años</span>
                </div>
              </div>
              <div class="col-md-2">
                <label for="validationFechaNac" class="form-label">Fecha de Nacimiento</label>
                <input type="date" class="form-control" id="fecha_nacimiento" value="${docSnap.data().fecha
            }" required>
              </div>
              <div class="col-md-2">
                <label for="validationPeso" class="form-label">Peso</label>
                <div class="input-group">
                  <input type="text" pattern="[0-9]+([,\.][0-9]+)?" title="Ingrese solo números" class="form-control" id="peso" value="${docSnap.data().peso
            }" aria-describedby="inputGroupPrepend2" required>
              <span class="input-group-text bg-black bg-opacity-75 text-light" id="inputGroupPrepend2" >Kg</span>
            </div>
          </div>
            <div class="col-md-2">
              <label for="validationEdad" class="form-label">Altura</label>
              <div class="input-group">
                <input type="int" pattern="[0-9]+([,\.][0-9]+)?"  title="Ingrese solo números" class="form-control" id="altura" value="${docSnap.data().altura
            }" required>
            <span class="input-group-text bg-black bg-opacity-75 text-light" id="inputGroupPrepend2">Metros</span>
          </div>
        </div>
        <div class="col-12">
          <button class="btn btn-primary" id="btn1">Guardar</button>
        </div>
      </form> 
    </div>
  </div>
</div>
<!--Segunda pestaña de acordeon-->
<div class="accordion-item">
  <h2 class="accordion-header" id="headingTwo">
    <button class="accordion-button collapsed" type="button" id="mostrar_vacunas" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      Historial de vacunación
    </button>
  </h2>
  <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
    <!--lista iterable de vacunas-->
    <div id="lista_Vac" class="d-flex flex-wrap"></div>
    <!-- Button trigger modal -->
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Agregar nueva vacuna</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="row g-3" id="form2">
              <div class="col-md-4">
                <label for="nombre_vacuna" class="form-label">Nombre/Tipo de vacuna</label>
                <input type="text" class="form-control" id="nombre_vacuna" required>
              </div>
              <div class="col-md-4">
                <label for="nombre_aplicador" class="form-label">Nombre de quien aplico la vacuna</label>
                <input type="text" class="form-control" id="nombre_aplicador" required>
              </div>
              <div class="col-md-4">
                <label for="lugar_aplicacion" class="form-label">Lugar donde se aplico la vacuna</label>
                <input type="text" class="form-control" id="lugar_aplicacion" required>
              </div>
              <div class="col-md-4">
                <label for="fecha_dosis" class="form-label">Fecha de dosis</label>
                <input type="date" class="form-control" id="fecha_dosis" required>
              </div>
              <div class="col-12">
                <button class="btn btn-primary" data-bs-dismiss="modal" type="button" id="btn2">Submit form</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-body">
      <div class="col-12">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar nueva vacuna</button>
      </div>
    </div>
  </div>
</div>
<!--Tercera pestaña de acordeon-->
<div class="accordion-item">
  <h2 class="accordion-header" id="headingThree">
    <button class="accordion-button collapsed" type="button" id="mostrar_revisiones" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      Historial de revisiones pediatricas.
    </button>
  </h2>
  <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
    <!--lista iterable de vacunas-->
    <div id="lista_His_Rev" class="d-flex flex-wrap"></div>
    <!-- Button trigger modal -->
    <!-- Modal -->
    <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Detalles de la revisión</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="row g-3" id="form3">
              <div class="col-md-4">
                <label for="medicamento_recetado" class="form-label">Medicamento recetado</label>
                <input type="text" class="form-control" id="medicamento_recetado">
              </div>
              <div class="col-md-4">
                <label for="datos_relevantes" class="form-label">Datos relevantes</label>
                <input type="text" class="form-control" id="datos_relevantes">
              </div>
              <div class="col-md-4">
                <label for="nombre_reviso" class="form-label">Nombre de quien realizo la revisión</label>
                <input type="text" class="form-control" id="nombre_reviso" required>
              </div>
              <div class="col-md-4">
                <label for="lugar_revision" class="form-label">Lugar donde de la revisión</label>
                <input type="text" class="form-control" id="lugar_revision" required>
              </div>
              <div class="col-md-4">
                <label for="fecha_revision" class="form-label">Fecha de revisión</label>
                <input type="date" class="form-control" id="fecha_revision" required>
              </div>
              <div class="col-12">
                <button class="btn btn-primary " data-bs-dismiss="modal" type="button" id="btn3">Guardar revisión</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-body">
      <div class="col-12">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">Agregar nueva revisión</button>
      </div>
    </div>
  </div>
</div>
<!--Cuarta pestaña de acordeon-->
<div class="accordion-item">
  <h2 class="accordion-header" id="headingFour">
    <button class="accordion-button collapsed" type="button" id="mostrar_alergias" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
      Historial de alergias.
    </button>
  </h2>
  <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
    <!--lista iterable de vacunas-->
    <div id="lista_Alergias" class="d-flex flex-wrap"></div>
    <!-- Button trigger modal -->
    <!-- Modal -->
    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Alergias</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="row g-3" id="form10">
              <div class="col-md-4">
                <label for="alergia_registrada" class="form-label">Alergia</label>
                <input type="text" class="form-control" id="alergia_registrada">
              </div>
              <div class="col-md-4">
                <label for="datos_relevantes" class="form-label">Datos relevantes</label>
                <input type="text" class="form-control" id="datos_relevantes">
              </div>
              <div class="col-md-4">
                <label for="lugar_caso" class="form-label">Como ocurrio</label>
                <input type="text" class="form-control" id="lugar_caso" required>
              </div>
              <div class="col-md-4">
                <label for="fecha_caso" class="form-label">Fecha de caso</label>
                <input type="date" class="form-control" id="fecha_caso" required>
              </div>
              <div class="col-12">
                <button class="btn btn-primary " data-bs-dismiss="modal" type="button" id="btn4">Guardar Alergia</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-body">
      <div class="col-12">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">Agregar nueva alergia</button>
      </div>
    </div>
  </div>
</div>
<!--Quinta pestaña-->
<div class="accordion-item">
                <h2 class="accordion-header" id="headingFive">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                    Datos principales del pediatra
                  </button>
                </h2>
                <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <!--formulario de datos generales del bebé-->
                    <form class="row g-3">
                      <div class="col-md-4">
                        <label for="nombre_pediatra" class="form-label">Nombre(s) del pediatra</label>
                        <input type="text" class="form-control" id="nombre_pediatra" value="${docSnap.data().nombre_pediatra
            }" required>
                </div>
                <div class="col-md-4">
                  <label for="apellido_pediatra" class="form-label">Apellido paterno</label>
                  <input type="text" class="form-control" id="apellido_pediatra" value="${docSnap.data().apellido_pediatra
            }" required>
                </div>
                <div class="col-md-4">
                  <label for="apellido2_pediatra" class="form-label">Apellido materno</label>
                  <input type="text" class="form-control" id="apellido2_pediatra" value="${docSnap.data().apellido2_pediatra
            }" required>
              </div>
              <div class="col-md-4">
                  <label for="numero_cedula" class="form-label">Cedula</label>
                  <input type="text" class="form-control" id="numero_cedula" value="${docSnap.data().numero_cedula
            }" required>
              </div>
              <div class="col-md-4">
                  <label for="direccion_pediatra" class="form-label">Dirección</label>
                  <input type="text" class="form-control" id="direccion_pediatra" value="${docSnap.data().direccion_pediatra
            }" required>
              </div>
              <div class="col-md-4">
                  <label for="correo_pediatra" class="form-label">Correo electronico</label>
                  <input type="text" class="form-control" id="correo_pediatra" value="${docSnap.data().correo_pediatra
            }" required>
              </div>
              <div class="col-md-2">
                <label for="telefono_pediatra" class="form-label">Telefono</label>
                <div class="input-group">
                  <span class="input-group-text bg-black bg-opacity-75 text-light" id="inputGroupPrepend2" >+</span>
                  <input type="int" class="form-control" id="telefono_pediatra" value="${docSnap.data().telefono_pediatra
            }" required>
                </div>
              </div>
        <div class="col-12">
        <button class="btn btn-primary" id="btn5">Guardar</button>
        </div>
      </form> 
    </div>
  </div>
</div>
<!--Sexta pestaña de acordeon-->
<div class="accordion-item">
  <h2 class="accordion-header" id="headingSix">
    <button class="accordion-button collapsed" type="button" id="mostrar_medicamentos" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
      Historial de Medicamentos.
    </button>
  </h2>
  <div id="collapseSix" class="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#accordionExample">
    <!--lista iterable de vacunas-->
    <div id="lista_medicamentos" class="d-flex flex-wrap"></div>
    <!-- Button trigger modal -->
    <!-- Modal -->
    <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Medicamentos</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="row g-3" id="form4">
              <div class="col-md-4">
                <label for="nombre_medicamento" class="form-label">Meedicamento</label>
                <input type="text" class="form-control" id="nombre_medicamento">
              </div>
              <div class="col-md-4">
                <label for="fecha_inicio" class="form-label">Fecha de primer toma</label>
                <input type="date" class="form-control" id="fecha_inicio">
              </div>
              <div class="col-md-4">
                <label for="fecha_fin" class="form-label">Fecha ultima toma</label>
                <input type="date" class="form-control" id="fecha_fin" required>
              </div>
              <div class="col-md-4">
                <label for="dosis" class="form-label">dosis</label>
                <input type="text" class="form-control" id="dosis" required>
              </div>
              <div class="col-12">
                <button class="btn btn-primary " data-bs-dismiss="modal" type="button" id="btn6">Guardar medicamento</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-body">
      <div class="col-12">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal3">Agregar nuevo medicamento</button>
      </div>
    </div>
  </div>
</div>
<!--Octava pestaña de acordeon-->
<div class="accordion-item">
  <h2 class="accordion-header" id="headingEight">
    <button class="accordion-button collapsed" type="button" id="mostrar_suenos" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
      Control de sueño.
    </button>
  </h2>
  <div id="collapseEight" class="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#accordionExample">
    <!--lista iterable de vacunas-->
    <div id="lista_suenos" class="d-flex flex-wrap"></div>
    <!-- Button trigger modal -->
    <!-- Modal -->
    <div class="modal fade" id="exampleModal4" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Control de sueño del bebé</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form class="row g-3" id="form4">
              <div class="col-md-4">
                <label for="horas_sueño" class="form-label">Horas de sueño</label>
                <input type="int" pattern="[0-9]+" title="Ingrese solo números" class="form-control" id="horas_sueño" required>
              </div>
              <div class="col-md-4">
                <label for="fecha_inicio" class="form-label">Fecha de la noche</label>
                <input type="date" class="form-control" id="fecha_inicio">
              </div>
              <div class="col-md-4">
                <label for="patron_sueño" class="form-label">Patron de sueño (pesadillas, sueño profundo, etc)</label>
                <input type="text" class="form-control" id="patron_sueño" required>
              </div>
              <div class="col-md-4">
                <label for="habito_sueño" class="form-label">Hábitos de sueño</label>
                <input type="text" class="form-control" id="habito_sueño" required>
              </div>
              <div class="col-12">
                <button class="btn btn-primary " data-bs-dismiss="modal" type="button" id="btn8">Guardar datos de sueño</button>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="accordion-body">
      <div class="col-12">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal4">Agregar nuevos datos de sueño</button>
      </div>
    </div>
  </div>
</div>
    <!--Novena pestaña de acordeon-->
    <div class="accordion-item">
                <h2 class="accordion-header" id="headingNine">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">
                    Datos de contacto
                  </button>
                </h2>
                <div id="collapseNine" class="accordion-collapse collapse" aria-labelledby="headingNine" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <!--formulario de datos generales del bebé-->
                    <form class="row g-3" onsubmit="return false">
                      <div class="col-md-4">
                        <label for="nombre_contacto" class="form-label">Nombre(s) del contacto</label>
                        <input type="text" class="form-control" id="nombre_contacto" value="${docSnap.data().nombre_contacto
            }" required>
                </div>
                <div class="col-md-4">
                  <label for="apellido_contacto" class="form-label">Apellido paterno</label>
                  <input type="text" class="form-control" id="apellido_contacto" value="${docSnap.data().apellido_contacto
            }" required>
                </div>
                <div class="col-md-4">
                  <label for="apellido2_contacto" class="form-label">Apellido materno</label>
                  <input type="text" class="form-control" id="apellido2_contacto" value="${docSnap.data().apellido2_contacto
            }" required>
              </div>
              <div class="col-md-4">
                  <label for="curp" class="form-label">Celular</label>
                  <input type="text" class="form-control" id="curp" value="${docSnap.data().curp
            }" required>
              </div>
              <div class="col-md-4">
                  <label for="direccion_contacto" class="form-label">Dirección</label>
                  <input type="text" class="form-control" id="direccion_contacto" value="${docSnap.data().direccion_contacto
            }" required>
              </div>
              <div class="col-md-4">
                  <label for="correo_contacto" class="form-label">Correo electronico</label>
                  <input type="text" class="form-control" id="correo_contacto" value="${docSnap.data().correo_contacto
            }" required>
              </div>
              <div class="col-md-2">
                <label for="telefono_contacto" class="form-label">Telefono</label>
                <div class="input-group">
                  <span class="input-group-text bg-black bg-opacity-75 text-light" id="inputGroupPrepend2" >+</span>
                  <input type="int"  class="form-control" id="telefono_contacto" value="${docSnap.data().telefono_contacto
            }" required>
                </div>
              </div>
        <div class="col-12">
          <button class="btn btn-primary" id="btn9">Guardar</button>
        </div>
      </form> 
    </div>
  </div>
</div>
    <!--Decima pestaña de acordeon-->
    <div class="accordion-item">
                <h2 class="accordion-header" id="headingTen">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                    Horarios de guarderia
                  </button>
                </h2>
                <div id="collapseTen" class="accordion-collapse collapse" aria-labelledby="headingTen" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <!--formulario de datos generales del bebé-->
                    <form class="row g-3">
                      <div class="col-md-4">
                        <label for="hora_inicio" class="form-label">Hora entrada</label>
                        <input type="time" class="form-control" id="hora_inicio" value="${docSnap.data().hora_inicio
            }" required>
                </div>
                <div class="col-md-4">
                        <label for="hora_fin" class="form-label">Hora salida</label>
                        <input type="time" class="form-control" id="hora_fin" value="${docSnap.data().hora_fin
            }" required>
                </div>
              </div>
        <div class="col-12">
          <button class="btn btn-primary" id="btn10">Guardar</button>
        </div>
      </form> 
    </div>
  </div>
</div>
<!--para atras-->
</div>`;
          //console.log("Document data:", docSnap.data());
          /* Datos generales del bebé */
          var btn1 = document.getElementById("btn1");
          btn1.addEventListener("click", function (event) {
            event.preventDefault();
            setDoc(doc(db, "datos-bebe", user.uid), {
              nombre: document.getElementById("nombre_bebe").value,
              apellido1: document.getElementById("apellido_bebe").value,
              apellido2: document.getElementById("apellido2_bebe").value,
              edad: document.getElementById("edad").value,
              fecha: document.getElementById("fecha_nacimiento").value,
              peso: document.getElementById("peso").value,
              altura: document.getElementById("altura").value,
              nombre_contacto: document.getElementById("nombre_contacto").value,
              apellido_contacto: document.getElementById("apellido_contacto").value,
              apellido2_contacto: document.getElementById("apellido2_contacto").value,
              telefono_contacto: document.getElementById("telefono_contacto").value,
              curp: document.getElementById("curp").value,
              direccion_contacto: document.getElementById("direccion_contacto").value,
              correo_contacto: document.getElementById("correo_contacto").value,
              nombre_pediatra: document.getElementById("nombre_pediatra").value,
              apellido_pediatra: document.getElementById("apellido_pediatra").value,
              apellido2_pediatra: document.getElementById("apellido2_pediatra").value,
              telefono_pediatra: document.getElementById("telefono_pediatra").value,
              numero_cedula: document.getElementById("numero_cedula").value,
              direccion_pediatra: document.getElementById("direccion_pediatra").value,
              correo_pediatra: document.getElementById("correo_pediatra").value,
              hora_inicio: document.getElementById("hora_inicio").value,
              hora_fin: document.getElementById("hora_fin").value,
            });
          });
          /* Datos de vacunación Subcolección*/
          /**consulta */
          //Vacunas lista de ellas
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

          const listaVacunas=document.getElementById('lista_Vac');
          // Agregar un event listener a la lista de actividades
          listaVacunas.addEventListener('click', (event) => {
            // Verificar si el elemento pulsado es un botón de eliminación
            if (event.target.classList.contains('vacunas')) {
              // Obtener el id de la actividad a eliminar
              const idTarea = event.target.parentNode.id;
              // Llamar a una función que elimine la actividad de Firestore
              //console.log(idTarea);
              const docRef = doc(db, "datos-bebe", user.uid, "vacunas", idTarea);
  
              deleteDoc(docRef)
                .then(() => {
                  console.log("Documento eliminado correctamente.");
                })
                .catch((error) => {
                  console.error("Error eliminando el documento: ", error);
                });
            }
          });
          
          /**formulario */

          var btn2 = document.getElementById("btn2");
          var cuentaV = '';
          btn2.addEventListener("click", function (event) {
            document.getElementById('form2').reset();
            event.preventDefault();
            const userDocRef = doc(db, "datos-bebe", user.uid);
            const vacunasCollectionRef = collection(userDocRef, "vacunas");
            getDocs(vacunasCollectionRef).then((querySnapshot) => {
              // console.log("Number of vacunas:", querySnapshot.size);
              let conta = querySnapshot.size +2;
              cuentaV = 'Vacuna ' + conta;
              setDoc(doc(db, "datos-bebe", user.uid, "vacunas", cuentaV), {
                nombre: document.getElementById('nombre_vacuna').value,
                nombreAplicador: document.getElementById('nombre_aplicador').value,
                fechaVacuna: document.getElementById('fecha_dosis').value,
                lugarAplicacion: document.getElementById('lugar_aplicacion').value,
              });
            }).catch((error) => {
              console.log("Error getting documents:", error);
            });
          });
          /* Datos  Revisión pediatrica Subcolección*/
                    //Historial de revisión lista de ellas
                    const userDocRef2 = doc(db, "datos-bebe", user.uid);
                    const revisionCollectionRef2 = collection(userDocRef2, "revisiones");
                    const orderedRevisionCollectionRef = query(revisionCollectionRef2, orderBy("fecha_revision", "desc"));
                    document.getElementById('mostrar_revisiones').addEventListener('click', function () {
                      getDocs(orderedRevisionCollectionRef).then((querySnapshot) => {
                        document.getElementById('lista_His_Rev').innerHTML ='';
                        querySnapshot.forEach((doc) => {
                          //console.log(doc.id, " => ", doc.data());
                          document.getElementById('lista_His_Rev').innerHTML += /*html*/`
                          <div class="alert alert-warning alert-dismissible fade show" id="${doc.id}" role="alert" >
                          Se reviso el dia ${doc.data().fecha_revision} en ${doc.data().lugar_revision} con ${doc.data().nombre_reviso} dando los siguientes datos del niño ${doc.data().datos_relevantes} ${doc.data().medicamento_recetado}
                          <button type="button" class="btn-close revisiones" data-bs-dismiss="alert" aria-label="Close" id="${doc.id}"></button>
                        </div>`;
                        });
                        var bye=(a,b)=>{
                          alert(a);
                        }
                      }).catch((error) => {
                        console.log("Error getting documents:", error);
                      })
                    });
          
                    const listaRevisiones=document.getElementById('lista_His_Rev');
                    // Agregar un event listener a la lista de actividades
                    listaRevisiones.addEventListener('click', (event) => {
                      // Verificar si el elemento pulsado es un botón de eliminación
                      if (event.target.classList.contains('revisiones')) {
                        // Obtener el id de la actividad a eliminar
                        const idRevision = event.target.parentNode.id;
                        // Llamar a una función que elimine la actividad de Firestore
                        //console.log(idTarea);
                        const docRef = doc(db, "datos-bebe", user.uid, "revisiones", idRevision);
            
                        deleteDoc(docRef)
                          .then(() => {
                            console.log("Documento eliminado correctamente.");
                          })
                          .catch((error) => {
                            console.error("Error eliminando el documento: ", error);
                          });
                      }
                    });
                    
                    /**formulario */
          
                    var btn3 = document.getElementById("btn3");
                    var cuentaV = '';
                    btn3.addEventListener("click", function (event) {
                      document.getElementById('form2').reset();
                      event.preventDefault();
                      const userDocRef = doc(db, "datos-bebe", user.uid);
                      const revisionCollectionRef = collection(userDocRef, "revisiones");
                      getDocs(revisionCollectionRef).then((querySnapshot) => {
                        let conta = querySnapshot.size + 2;
                        cuentaV = 'revision' + conta;
                        setDoc(doc(db, "datos-bebe", user.uid, "revisiones", cuentaV), {
                          lugar_revision: document.getElementById('lugar_revision').value,
                          medicamento_recetado: document.getElementById('medicamento_recetado').value,
                          datos_relevantes: document.getElementById('datos_relevantes').value,
                          nombre_reviso: document.getElementById('nombre_reviso').value,
                          fecha_revision: document.getElementById('fecha_revision').value,
                        });
                      }).catch((error) => {
                        console.log("Error getting documents:", error);
                      });
                    });
                    /* Datos  alergias Subcoleccion*/
                    const userDocRef3 = doc(db, "datos-bebe", user.uid);
                    const alergiaCollectionRef2 = collection(userDocRef3, "alergias");
                    const orderedAlergiaCollectionRef = query(alergiaCollectionRef2, orderBy("fecha_caso", "desc"));
                    document.getElementById('mostrar_alergias').addEventListener('click', function () {
                      getDocs(orderedAlergiaCollectionRef).then((querySnapshot) => {
                        document.getElementById('lista_Alergias').innerHTML ='';
                        querySnapshot.forEach((doc) => {
                          //console.log(doc.id, " => ", doc.data());
                          document.getElementById('lista_Alergias').innerHTML += /*html*/`
                          <div class="alert alert-warning alert-dismissible fade show" id="${doc.id}" role="alert" >
                          El caso de alergia ocurrio el día ${doc.data().fecha_caso} siendo un caso de alergia a ${doc.data().alergia_registrada} en ${doc.data().lugar_caso} dando los siguientes datos del caso ${doc.data().datos_relevantes} 
                          <button type="button" class="btn-close alergias" data-bs-dismiss="alert" aria-label="Close" id="${doc.id}"></button>
                        </div>`;
                        });
                        var bye=(a,b)=>{
                          alert(a);
                        }
                      }).catch((error) => {
                        console.log("Error getting documents:", error);
                      })
                    });
          
                    const listaAlergias=document.getElementById('lista_Alergias');
                    // Agregar un event listener a la lista de actividades
                    listaAlergias.addEventListener('click', (event) => {
                      // Verificar si el elemento pulsado es un botón de eliminación
                      if (event.target.classList.contains('alergias')) {
                        // Obtener el id de la actividad a eliminar
                        const idRevision = event.target.parentNode.id;
                        // Llamar a una función que elimine la actividad de Firestore
                        //console.log(idTarea);
                        const docRef = doc(db, "datos-bebe", user.uid, "alergias", idRevision);
            
                        deleteDoc(docRef)
                          .then(() => {
                            console.log("Documento eliminado correctamente.");
                          })
                          .catch((error) => {
                            console.error("Error eliminando el documento: ", error);
                          });
                      }
                    });
                    
                    /**formulario */
          
                    var btn4 = document.getElementById("btn4");
                    var cuentaV = '';
                    btn4.addEventListener("click", function (event) {
                      document.getElementById('form10').reset();
                      event.preventDefault();
                      const userDocRef = doc(db, "datos-bebe", user.uid);
                      const revisionCollectionRef = collection(userDocRef, "alergias");
                      getDocs(revisionCollectionRef).then((querySnapshot) => {
                        let conta = querySnapshot.size + 2;
                        cuentaV = 'alergia' + conta;
                        setDoc(doc(db, "datos-bebe", user.uid, "alergias", cuentaV), {
                          lugar_caso: document.getElementById('lugar_caso').value,
                          alergia_registrada: document.getElementById('alergia_registrada').value,
                          datos_relevantes: document.getElementById('datos_relevantes').value,
                          fecha_caso: document.getElementById('fecha_caso').value,
                        });
                      }).catch((error) => {
                        console.log("Error getting documents:", error);
                      });
                    });
          /* Datos  Pediatra CANCELED*/
          var btn5 = document.getElementById("btn5");
          btn5.addEventListener("click", function (event) {
            event.preventDefault();
            setDoc(doc(db, "datos-bebe", user.uid), {
              nombre: document.getElementById("nombre_bebe").value,
              apellido1: document.getElementById("apellido_bebe").value,
              apellido2: document.getElementById("apellido2_bebe").value,
              edad: document.getElementById("edad").value,
              fecha: document.getElementById("fecha_nacimiento").value,
              peso: document.getElementById("peso").value,
              altura: document.getElementById("altura").value,
              nombre_contacto: document.getElementById("nombre_contacto").value,
              apellido_contacto: document.getElementById("apellido_contacto").value,
              apellido2_contacto: document.getElementById("apellido2_contacto").value,
              telefono_contacto: document.getElementById("telefono_contacto").value,
              curp: document.getElementById("curp").value,
              direccion_contacto: document.getElementById("direccion_contacto").value,
              correo_contacto: document.getElementById("correo_contacto").value,
              nombre_pediatra: document.getElementById("nombre_pediatra").value,
              apellido_pediatra: document.getElementById("apellido_pediatra").value,
              apellido2_pediatra: document.getElementById("apellido2_pediatra").value,
              telefono_pediatra: document.getElementById("telefono_pediatra").value,
              numero_cedula: document.getElementById("numero_cedula").value,
              direccion_pediatra: document.getElementById("direccion_pediatra").value,
              correo_pediatra: document.getElementById("correo_pediatra").value,
              hora_inicio: document.getElementById("hora_inicio").value,
              hora_fin: document.getElementById("hora_fin").value,
            });
          });
          /* Datos  Medicamentos Subcolección*/
          const userDocRef4 = doc(db, "datos-bebe", user.uid);
          const medicamentoCollectionRef2 = collection(userDocRef4, "medicamentos");
          const orderedMedicamentosCollectionRef = query(medicamentoCollectionRef2, orderBy("fecha_fin", "desc"));
          document.getElementById('mostrar_medicamentos').addEventListener('click', function () {
            getDocs(orderedMedicamentosCollectionRef).then((querySnapshot) => {
              document.getElementById('lista_medicamentos').innerHTML ='';
              querySnapshot.forEach((doc) => {
                //console.log(doc.id, " => ", doc.data());
                document.getElementById('lista_medicamentos').innerHTML += /*html*/`
                <div class="alert alert-warning alert-dismissible fade show" id="${doc.id}" role="alert" >
                  Se le administro ${doc.data().nombre_medicamento} del dia ${doc.data().fecha_inicio} al día ${doc.data().fecha_fin} con una dosis de ${doc.data().dosis} 
                <button type="button" class="btn-close medicamentos" data-bs-dismiss="alert" aria-label="Close" id="${doc.id}"></button>
              </div>`;
              });
            }).catch((error) => {
              console.log("Error getting documents:", error);
            })
          });

          const listaMedicamentos=document.getElementById('lista_medicamentos');
          // Agregar un event listener a la lista de actividades
          listaMedicamentos.addEventListener('click', (event) => {
            // Verificar si el elemento pulsado es un botón de eliminación
            if (event.target.classList.contains('medicamentos')) {
              // Obtener el id de la actividad a eliminar
              const idMedicamentos = event.target.parentNode.id;
              // Llamar a una función que elimine la actividad de Firestore
              //console.log(idTarea);
              const docRef = doc(db, "datos-bebe", user.uid, "medicamentos", idMedicamentos);
  
              deleteDoc(docRef)
                .then(() => {
                  console.log("Documento eliminado correctamente.");
                })
                .catch((error) => {
                  console.error("Error eliminando el documento: ", error);
                });
            }
          });
          
          /**formulario */

          var btn6 = document.getElementById("btn6");
          var cuentaV = '';
          btn6.addEventListener("click", function (event) {
            document.getElementById('form4').reset();
            event.preventDefault();
            const userDocRef = doc(db, "datos-bebe", user.uid);
            const revisionCollectionRef = collection(userDocRef, "medicamentos");
            getDocs(revisionCollectionRef).then((querySnapshot) => {
              let conta = querySnapshot.size + 2;
              cuentaV = 'medicamento' + conta;
              setDoc(doc(db, "datos-bebe", user.uid, "medicamentos", cuentaV), {
                  nombre_medicamento: document.getElementById('nombre_medicamento').value,
                  fecha_inicio: document.getElementById('fecha_inicio').value,
                  fecha_fin: document.getElementById('fecha_fin').value,
                  dosis: document.getElementById('dosis').value,
              });
            }).catch((error) => {
              console.log("Error getting documents:", error);
            });
          });
          /* Datos  control de sueño Subcolección con Subcolección*/
          const userDocRef5 = doc(db, "datos-bebe", user.uid);
          const SuenoCollectionRef2 = collection(userDocRef5, "suenos");
          const orderedSuenosCollectionRef = query(SuenoCollectionRef2, orderBy("fecha_inicio", "desc"));
          document.getElementById('mostrar_suenos').addEventListener('click', function () {
            getDocs(orderedSuenosCollectionRef).then((querySnapshot) => {
              document.getElementById('lista_suenos').innerHTML ='';
              querySnapshot.forEach((doc) => {
                //console.log(doc.id, " => ", doc.data());
                document.getElementById('lista_suenos').innerHTML += /*html*/`
                <div class="alert alert-warning alert-dismissible fade show" id="${doc.id}" role="alert" >
                  El niño durmio un total de ${doc.data().horas_sueño} horas, el dia ${doc.data().fecha_inicio} con  ${doc.data().patron_sueño} y sus habitos ${doc.data().habito_sueño} 
                <button type="button" class="btn-close suenos" data-bs-dismiss="alert" aria-label="Close" id="${doc.id}"></button>
              </div>`;
              });
            }).catch((error) => {
              console.log("Error getting documents:", error);
            })
          });

          const listaSuenos=document.getElementById('lista_suenos');
          // Agregar un event listener a la lista de actividades
          listaSuenos.addEventListener('click', (event) => {
            // Verificar si el elemento pulsado es un botón de eliminación
            if (event.target.classList.contains('suenos')) {
              // Obtener el id de la actividad a eliminar
              const idsuenos = event.target.parentNode.id;
              // Llamar a una función que elimine la actividad de Firestore
              //console.log(idTarea);
              const docRef = doc(db, "datos-bebe", user.uid, "suenos", idsuenos);
  
              deleteDoc(docRef)
                .then(() => {
                  console.log("Documento eliminado correctamente.");
                })
                .catch((error) => {
                  console.error("Error eliminando el documento: ", error);
                });
            }
          });
          
          /**formulario */

          var btn8 = document.getElementById("btn8");
          var cuentaV = '';
          btn8.addEventListener("click", function (event) {
            document.getElementById('form4').reset();
            event.preventDefault();
            const userDocRef = doc(db, "datos-bebe", user.uid);
            const revisionCollectionRef = collection(userDocRef, "suenos");
            getDocs(revisionCollectionRef).then((querySnapshot) => {
              let conta = querySnapshot.size + 2;
              cuentaV = 'sueno' + conta;
              setDoc(doc(db, "datos-bebe", user.uid, "suenos", cuentaV), {
                  horas_sueño: document.getElementById('horas_sueño').value,
                  fecha_inicio: document.getElementById('fecha_inicio').value,
                  patron_sueño: document.getElementById('patron_sueño').value,
                  habito_sueño: document.getElementById('habito_sueño').value,
              });
            }).catch((error) => {
              console.log("Error getting documents:", error);
            });
          });
          /* Datos  Guarderia*/
          var btn10 = document.getElementById("btn10");
          btn10.addEventListener("click", function (event) {
            event.preventDefault();
            setDoc(doc(db, "datos-bebe", user.uid,), {
              nombre: document.getElementById("nombre_bebe").value,
              apellido1: document.getElementById("apellido_bebe").value,
              apellido2: document.getElementById("apellido2_bebe").value,
              edad: document.getElementById("edad").value,
              fecha: document.getElementById("fecha_nacimiento").value,
              peso: document.getElementById("peso").value,
              altura: document.getElementById("altura").value,
              nombre_contacto: document.getElementById("nombre_contacto").value,
              apellido_contacto: document.getElementById("apellido_contacto").value,
              apellido2_contacto: document.getElementById("apellido2_contacto").value,
              telefono_contacto: document.getElementById("telefono_contacto").value,
              curp: document.getElementById("curp").value,
              direccion_contacto: document.getElementById("direccion_contacto").value,
              correo_contacto: document.getElementById("correo_contacto").value,
              nombre_pediatra: document.getElementById("nombre_pediatra").value,
              apellido_pediatra: document.getElementById("apellido_pediatra").value,
              apellido2_pediatra: document.getElementById("apellido2_pediatra").value,
              telefono_pediatra: document.getElementById("telefono_pediatra").value,
              numero_cedula: document.getElementById("numero_cedula").value,
              direccion_pediatra: document.getElementById("direccion_pediatra").value,
              correo_pediatra: document.getElementById("correo_pediatra").value,
              hora_inicio: document.getElementById("hora_inicio").value,
              hora_fin: document.getElementById("hora_fin").value,
            });
          });
          /* Datos  contacto de emergencia*/
          var btn9 = document.getElementById("btn9");
          btn9.addEventListener("click", function (event) {
            event.preventDefault();
            setDoc(doc(db, "datos-bebe", user.uid,), {
              nombre: document.getElementById("nombre_bebe").value,
              apellido1: document.getElementById("apellido_bebe").value,
              apellido2: document.getElementById("apellido2_bebe").value,
              edad: document.getElementById("edad").value,
              fecha: document.getElementById("fecha_nacimiento").value,
              peso: document.getElementById("peso").value,
              altura: document.getElementById("altura").value,
              nombre_contacto: document.getElementById("nombre_contacto").value,
              apellido_contacto: document.getElementById("apellido_contacto").value,
              apellido2_contacto: document.getElementById("apellido2_contacto").value,
              telefono_contacto: document.getElementById("telefono_contacto").value,
              curp: document.getElementById("curp").value,
              direccion_contacto: document.getElementById("direccion_contacto").value,
              correo_contacto: document.getElementById("correo_contacto").value,
              nombre_pediatra: document.getElementById("nombre_pediatra").value,
              apellido_pediatra: document.getElementById("apellido_pediatra").value,
              apellido2_pediatra: document.getElementById("apellido2_pediatra").value,
              telefono_pediatra: document.getElementById("telefono_pediatra").value,
              numero_cedula: document.getElementById("numero_cedula").value,
              direccion_pediatra: document.getElementById("direccion_pediatra").value,
              correo_pediatra: document.getElementById("correo_pediatra").value,
              hora_inicio: document.getElementById("hora_inicio").value,
              hora_fin: document.getElementById("hora_fin").value,
            });
          });
        } else {
          bodys.innerHTML = /*html*/ `
<div class="text-end pt-1" >
  <a type="button" class="btn btn-primary" href="./info-bb.html">
    Terminar
  </a>
</div>
<div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Datos principales del bebé
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <!--formulario de datos generales del bebé-->
        <form class="row g-3">
          <div class="col-md-4">
            <label for="validationNombre" class="form-label">Nombre(s) del bebé</label>
            <input type="text" class="form-control" id="nombre_bebe" required>
          </div>
          <div class="col-md-4">
            <label for="validationApellidos" class="form-label">Apellido paterno</label>
            <input type="text" class="form-control" id="apellido_bebe" required>
          </div>
          <div class="col-md-4">
            <label for="validationApellidos2" class="form-label">Apellido materno</label>
            <input type="text" class="form-control" id="apellido2_bebe" required>
          </div>
          <div class="col-md-2">
            <label for="validationEdad" class="form-label">Edad</label>
            <input type="int" pattern="[0-9]+" title="Ingrese solo números" class="form-control" id="edad" required>
          </div>
          <div class="col-md-2">
            <label for="validationFechaNac" class="form-label">Fecha de Nacimiento</label>
            <input type="date" class="form-control" id="fecha_nacimiento" required>
          </div>
          <div class="col-md-2">
            <label for="validationPeso" class="form-label">Peso</label>
            <div class="input-group">
              <input type="text" pattern="[0-9]+([,\.][0-9]+)?" title="Ingrese solo números" class="form-control" id="peso" aria-describedby="inputGroupPrepend2" required>
              <span class="input-group-text bg-black bg-opacity-75 text-light" id="inputGroupPrepend2" >Kg</span>
            </div>
          </div>
          <div class="col-md-2">
            <label for="validationEdad" class="form-label">Altura</label>
            <div class="input-group">
              <input type="int" pattern="[0-9]+([,\.][0-9]+)?"  title="Ingrese solo números" class="form-control" id="altura" required>
              <span class="input-group-text bg-black bg-opacity-75 text-light" id="inputGroupPrepend2">Metros</span>
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary" type="submit" id="btn1">Guardar</button>
          </div>
        </form> 
      </div>
    </div>
  </div>
</div>`;

          //formulario 1
          var nom = document.getElementById("nombre_bebe");
          nom.addEventListener("focus", () => {
            setDoc(doc(db, "datos-bebe", user.uid), {
              nombre: '',
            });
          });
          /* Datos generales del bebé */
          var btn1 = document.getElementById("btn1");
          btn1.addEventListener("click", () => {
            setDoc(doc(db, "datos-bebe", user.uid), {
              nombre: document.getElementById("nombre_bebe").value,
              apellido1: document.getElementById("apellido_bebe").value,
              apellido2: document.getElementById("apellido2_bebe").value,
              edad: document.getElementById("edad").value,
              fecha: document.getElementById("fecha_nacimiento").value,
              peso: document.getElementById("peso").value,
              altura: document.getElementById("altura").value,
            });
          });
          /* Datos de vacunación Subcolección*/
          /* Datos  Revisión pediatrica Subcolección*/
          /* Datos  Pediatra*/
          /* Datos  Medicamentos Subcolección*/
          /* Datos  Guarderia*/
          /* Datos  alergias*/
          /* Datos  control de sueño Subcolección con Subcolección*/
          /* Datos  contacto de emergencia*/
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  } else if (location.pathname == "/formularios.html") {
    bodys.innerHTML = /*html*/ `<div class="card bg-danger bg-opacity-75 text-center">
        <div class="card-header">
          Fallo de sesión
        </div>
        <div class="card-body">
          <h5 class="card-title">Aún no inicia sesión</h5>
          <p class="card-text">Debes iniciar sesión para poder acceder al contenido.</p>
        </div>
      </div>`;
  }
});

