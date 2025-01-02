import './styles.css';

type Props = {
  openMenu: boolean;
};

export const Menu = ({ openMenu }: Props) => {
  return (
    <div className={`menu ${openMenu ? 'menu--active' : ''} header__menu`}>
      <span className="menu__line"></span>
    </div>
  );
};
