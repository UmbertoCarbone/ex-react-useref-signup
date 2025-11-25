import { useState, useMemo, useRef } from "react";

function App() {
  //Stati per il form
  //campi controllati
  const [descrizione, setDescrizione] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //campi non controlalti
  /*  const [fullName, setFullName] = useState("");
  const [specializzazione, setSpecializzazione] = useState("");
  const [esperienza, setEsperienza] = useState(""); */
  // TODO: USEREF
  const fullNameRef = useRef();
  const specializzazioneRef = useRef();
  const esperienzaRef = useRef();

  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

  const isUsernameValid = useMemo(() => {
    /* ✅ Username: Deve contenere solo caratteri
 alfanumerici e almeno 6 caratteri (no spazi o simboli). */
    const charsValid = username
      .split("")
      .every(
        (char) => letters.includes(char.toLowerCase()) || numbers.includes(char)
      );
    return username.length >= 6 && charsValid;
  }, [username]);

  const isPasswordValid = useMemo(() => {
    return (
      password.length >= 8 &&
      password.split("").some((char) => letters.includes(char)) &&
      password.split("").some((char) => numbers.includes(char)) &&
      password.split("").some((char) => symbols.includes(char))
    );
  }, [password]);

  const isDescriptionValid = useMemo(() => {
    return (
      descrizione.trim().length >= 100 && descrizione.trim().length <= 1000
    );
  }, [descrizione]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // valori non controllati
    const fullName = fullNameRef.current.value;
    const specializzazione = specializzazioneRef.current.value;
    const esperienza = esperienzaRef.current.value;
    if (
      !fullName.trim() ||
      !username.trim() ||
      !password.trim() ||
      !specializzazione.trim() ||
      !esperienza.trim() ||
      !descrizione.trim()
    ) {
      alert("Compila tutti i campi");
      return;
    }
    if (Number(esperienza) <= 0) {
      alert("Gli anni di esperienza devono essere un numero positivo");
      return;
    }
    if (!isUsernameValid || !isPasswordValid || !isDescriptionValid) {
      alert("I CAMPI SONO ERRATI");
      return;
    }
    console.log("Dati del form compilati", {
      fullName,
      username,
      password,
      specializzazione,
      esperienza,
      descrizione,
    });
  };

  return (
    <>
      {/* Titolo della pagina */}
      <h1>Web Developer Signup</h1>

      <form onSubmit={handleSubmit}>
        {/* Nome completo */}
        <label>
          <p>Nome Completo</p>
          <input type="text" ref={fullNameRef} />
        </label>

        {/* Username */}
        <label>
          <p>username</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {username.trim() && (
            <p style={{ color: isUsernameValid ? "green" : "red" }}>
              {isUsernameValid ? "disponibile" : "non disponibile"}
            </p>
          )}
        </label>

        {/* Password */}
        <label>
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {password.trim() && (
            <p style={{ color: isPasswordValid ? "green" : "red" }}>
              {isPasswordValid ? "Password corretta" : "Password sbagliata"}
            </p>
          )}
        </label>

        {/* Specializzazione */}
        <label>
          <p>Specializzazione</p>
          <select ref={specializzazioneRef}>
            <option value="">Seleziona</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
          </select>
        </label>

        {/* Anni di esperienza */}
        <label>
          <p>Anni di Esperienza</p>
          <input
            type="number"
            ref={esperienzaRef}
            min="0" // Non permette valori negativi
            max="99" // Limite massimo (opzionale)
            step="1"
          />
        </label>

        {/* Descrizione */}
        <label>
          <p>descrizione</p>
          <textarea
            value={descrizione}
            onChange={(e) => setDescrizione(e.target.value)}
          ></textarea>
          {descrizione.trim() && (
            <p style={{ color: isDescriptionValid ? "green" : "red" }}>
              {isDescriptionValid
                ? `Descrizione valida (${descrizione.trim().length} caratteri)`
                : descrizione.trim().length < 100
                ? `Mancano ${
                    100 - descrizione.trim().length
                  } caratteri (minimo 100)`
                : `Troppi caratteri: ${
                    descrizione.trim().length
                  }/1000 (massimo 1000)`}
            </p>
          )}
        </label>

        {/* Pulsante di invio */}
        <button type="submit">Registrati</button>
      </form>
    </>
  );
}

export default App;

/* Crea un form di registrazione con i seguenti campi controllati (gestiti con useState):

✅ Nome completo (input di testo)

✅ Username (input di testo)

✅ Password (input di tipo password)

✅ Specializzazione (select con opzioni: "Full Stack", "Frontend", "Backend")

✅ Anni di esperienza (input di tipo number)

✅ Breve descrizione sullo sviluppatore (textarea)

Aggiungi una validazione al submit, verificando che:

Tutti i campi siano compilati
L'input Anni di esperienza sia un numero positivo
La Specializzazione sia selezionata

Al submit, se il form è valido, stampa in console i dati. */

/* 📌 Milestone 2: Validare in tempo reale
Aggiungere la validazione in tempo reale dei seguenti campi:

✅ Username: Deve contenere solo caratteri alfanumerici e almeno 6 caratteri (no spazi o simboli).

✅ Password: Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo.

✅ Descrizione: Deve contenere tra 100 e 1000 caratteri (senza spazi iniziali e finali).

Suggerimento: Per semplificare la validazione, puoi definire tre stringhe con i caratteri validi e usare .includes() per controllare se i caratteri appartengono a una di queste categorie:

const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\",.<>?/`~";
const letters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\",.<>?/`~";
Per ciascuno dei campi validati in tempo reale, mostrare un messaggio di errore (rosso) nel caso non siano validi, oppure un messaggio di conferma (verde) nel caso siano validi. */
