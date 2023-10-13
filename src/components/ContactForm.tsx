import React, { useRef } from "react";
import classes from "./ContactForm.module.css";

export default function ContactForm() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const formHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (nameRef.current && emailRef.current && messageRef.current) {
      try {
        const response = await fetch("http://localhost:3000/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: nameRef.current?.value,
            email: emailRef.current.value,
            message: messageRef.current.value,
          }),
        });

        const resData = await response.json();

        nameRef.current.value = "";
        emailRef.current.value = "";
        messageRef.current.value = "";
      } catch (error) {
        nameRef.current.value = "error";
        emailRef.current.value = "error";
        messageRef.current.value = "error";
      }
    }
  };

  return (
    <section className={classes.contact}>
      <h1 >Send Us A Message</h1>
      <form className={classes.form} onSubmit={formHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input ref={nameRef} type="text" id="name" required />
          </div>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input ref={emailRef} type="email" id="email" required />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea ref={messageRef} id="message" rows={5} required></textarea>
        </div>
        <div className={classes.actions}>
          <button type="submit">Send Message</button>
        </div>
      </form>
    </section>
  );
}
