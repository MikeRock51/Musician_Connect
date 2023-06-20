function Quote(props) {
  return (
    <blockquote
      className={`${props.bg} text-center shadow-text mx-auto display-6 py-3 px-3 w-75 col mb-0`}
      style={{ color: props.textColor }}
    >
      {props.text}
    </blockquote>
  );
}

export default Quote;
