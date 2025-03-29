import React from "react";
import styled from "styled-components";

function Footer() {
    return (
        <FooterNjord>
            © 2025 Inovatech Labs. Todos os direitos reservados. Desenvolvido para fornecer medições meteorológicas precisas e confiáveis.
            📍 Endereço: Fatec, 123 - Fatec, Jacareí, SP, Brasil 📞 Contato: +55 (12) 0000-0000📧 E-mail: suporte@inovatechlabs.com
        </FooterNjord>
    )
}

const FooterNjord = styled.div`
    background-color: #273D67;
    font-size: 18px;
    text-align: center;
    color: #fff;
    padding: 10px;
`;

export default Footer;