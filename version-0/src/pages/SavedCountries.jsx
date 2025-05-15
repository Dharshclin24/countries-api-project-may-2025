export default function SavedCountries() {
  function MyForm() {
    return (
      <form>
        <label>
          Enter your name:
          <input type="text" />
        </label>
      </form>
    );
  }
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<MyForm />);

  return <h1>Welcome to the Saved Countries Page</h1>;
}
