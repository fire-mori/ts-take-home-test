import { type ChangeEvent, type FormEvent, useState } from "react";
import { BRANDS } from "../../lib/consts.ts";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./add-insight.module.css";
import { createInsight } from "../../data/createInsight.ts";

type AddInsightProps = ModalProps;

export const AddInsight = (props: AddInsightProps) => {
  const [brandId, setBrand] = useState<number>(BRANDS[0].id);
  const [text, setText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const target = event.target;
    setText(target.value);
  };

  const handleBrandChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const target = event.target;
    setBrand(Number(target.value));
  };

  const handleAddInsight = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!brandId) {
      setErrorMessage("Missing brand");
      return;
    }
    if (!text) {
      setErrorMessage("Missing insight description");
      return;
    }

    await createInsight({ brandId, createdAt: new Date(), text });
  };

  return (
    <Modal {...props}>
      <h1 className={styles.heading}>Add a new insight</h1>
      <form className={styles.form} onSubmit={handleAddInsight}>
        <label className={styles.field}>
          <select
            className={styles["field-input"]}
            value={brandId}
            onChange={handleBrandChange}
          >
            {BRANDS.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          Insight
          <textarea
            className={styles["field-input"]}
            rows={5}
            placeholder="Something insightful..."
            onChange={handleTextChange}
          />
        </label>
        {errorMessage && <p>{errorMessage}</p>}
        <Button className={styles.submit} type="submit" label="Add insight" />
      </form>
    </Modal>
  );
};
