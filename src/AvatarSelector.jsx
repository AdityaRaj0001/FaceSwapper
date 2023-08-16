import React, { useState } from "react";

const AvatarSelector = ({handleTargetImage}) => {
  const [modal, setModal] = useState(false);

  


  return (
    <main className="container">
      <h1>Choose Your Avatar</h1>
      <article className="avatar" onClick={()=>setModal(!modal)}>
        <header>
          <img src="../kohli2.jpg" alt="" />
        </header>
        <footer className="text-center">Virat Kohli</footer>
      </article>

      {modal && (
        <dialog open id="modal-example">
          <article>
            <a
              href="#close"
              aria-label="Close"
              className="close"
              data-target="modal-example"
              onClick={()=>setModal(!modal)}
            ></a>
            <h3>Confirm your action!</h3>
            <p>
              Your face will be swapped with Virat Kohli's Face. Is this what you are trying to do?
            </p>
            <footer>
              <a
                href="#cancel"
                role="button"
                className="secondary"
                data-target="modal-example"
                onClick={()=>setModal(!modal)}
              >
                No
              </a>
              <a
                href="#confirm"
                role="button"
                data-target="modal-example"
                onClick={()=>handleTargetImage("../kohli2.jpg")}
              >
                Yes
              </a>
            </footer>
          </article>
        </dialog>
      )}
    </main>
  );
};

export default AvatarSelector;
