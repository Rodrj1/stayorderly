import style from '../../styles/Centerer.module.scss';

interface Props {
  children: JSX.Element;
}

const Centerer = ({ children }: Props) => {
  return <div className={style.container}>{children}</div>;
};

export default Centerer;
