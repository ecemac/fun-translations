import Button from "view/components/Button";
import Input from "view/components/Input";

export function TranslateForm() {
  return (
    <form className="contents" method="POST" action="/translate">
      <fieldset className="flex flex-col items-start gap-6">
        <div>
          <label htmlFor="engine" className="mr-2 text-zinc-900">
          Select Engine
        </label>
        <select id="engine" name="engine" className="text-zinc-900 p-2 border rounded">
          <option value="yoda">Yoda</option>
          <option value="pirate">Pirate</option>
          <option value="sindarin">Elvish Sindarin</option>
        </select>
        </div>
        
        <Input className="text-zinc-900" name="text" placeholder="Enter the text to translate here" />
        <Button className="text-amber-400" type="submit">Translate</Button>
      </fieldset>
    </form>
  );
}
