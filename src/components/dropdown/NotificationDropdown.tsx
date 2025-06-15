import React, { useState, useEffect } from "react";
import { DropdownContainer, DropdownButton, DropdownItem, DropdownList } from "./DropdownMenu";
import Cookies from 'js-cookie';

const NotificationDropdown: React.FC = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
    const cookieValue = Cookies.get('showAlert');
    if (cookieValue === 'true') {
      setIsChecked(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    Cookies.set('showAlert', String(checked), { expires: 365 }); 
  };
        
    return (
        <DropdownContainer onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}>
                <DropdownButton>Notificações</DropdownButton>
                      <DropdownList isOpen={isOpen}>
                        <DropdownItem>
                    <label htmlFor="alertCheck" className="inline-flex items-center cursor-pointer select-none">
  <input
    type="checkbox"
    className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
    id="alertCheck"
    name="alertCheck"
    checked={isChecked}
    onChange={handleChange}
  />
  <span className="ml-2 text-sm text-gray-800">Sempre mostrar alerta de navegação</span>
</label>
                            </DropdownItem>
                      </DropdownList>
        </DropdownContainer>
    )
};

export default NotificationDropdown;