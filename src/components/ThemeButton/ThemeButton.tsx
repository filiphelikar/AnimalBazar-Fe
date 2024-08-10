import styles from './ThemeButton.module.css';

interface ThemeButtonProps {
  theme: boolean;
  setTheme: (theme: boolean) => void;
  invertedIconLogic?: boolean;
}

const defaultOptions = {
  invertedIconLogic: false,
};

const ThemeButton: React.FC<ThemeButtonProps> = ({
  theme,
  setTheme,
  invertedIconLogic = defaultOptions.invertedIconLogic,
}) => (
  <label className={`${styles.container} ${theme ? styles.IsDark : styles.IsLight}`}>
    <input type='checkbox' defaultChecked={invertedIconLogic ? !theme : theme} onClick={() => setTheme(!theme)} />
    <div />
  </label>
);

export default ThemeButton;
