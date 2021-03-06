import {loginRequest, XHRLoginRequest} from '../../server/loginRequest';
import {setSuccessFor} from "../FormValidation/setSuccessFor";
import {setErrorFor} from "../FormValidation/setErrorFor";
import infrastructure from '../../img/is_logo-efactura.png';

export const LoginComponent = {
    render: () => {

        return `
      <div class="login-body form-body"> 
      
        <div class="login-container form-container"> 
          <div class="login-wrapper form-wrapper"> 
            <form class="login-form form"> 
              <h1 class="login-form__title form__title">Conectează-te</h1>
<!--              <h2 class="login-form__subtitle form__subtitle">Introdu mai jos e-mailul și parola ta:</h2>-->
              <div class="login-form__message"> 
                Adresa de e-mail sau parola introdusă nu este corectă, încercați din nou.
              </div>
              <div class="login-form__group form__group">
                <input type="email" placeholder="Adresă de email" name="email">
                <div class="error-handling">
                  <i class="fas fa-exclamation-circle"></i>
                  <small class="error" style="display: none;">Error message</small>
                </div>
              </div>
              <div class="login-form__group form__group">
                <input type="password" name="password" placeholder="Parola">
                <div class="error-handling">
                  <i class="fas fa-exclamation-circle"></i>
                  <small class="error" style="display: none;">Error message</small>
                  <button type="button" class="password-toggle" name="checkbox"><i class="fas fa-eye"></i></button>
                </div>
              </div>
              <input class="login-form__btn form__btn" type="submit" value="Logare">
              
              <div class="login-form__footer form__footer">
                <a href="#/password-restore">Ai uitat parola?</a>
                <a href="#/register">Nu ai cont? Înregistrează-te acum</a>
              </div>
            </form>
          </div>
        </div>
        <div class="company-logo"> 
        <img src=${infrastructure} alt="IntelectSoft Logo">
<!--        <div class="company-text"> -->
<!--            <span>powered by</span>-->
<!--            <span>intelectsoft</span>-->
<!--        </div>-->
      </div>
      </div>
    `;
    },
    loginRequest: () => {
        const logForm = document.querySelector('.login-form');
        logForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const loginData = await loginRequest(this);

            if (loginData.ErrorCode === 0) {
                /* Emulate loading */
                document.querySelector('.login-form__btn').value = 'Se încarcă...';
                document.querySelector('.login-form__btn').classList.add('charge');
                setTimeout(() => {
                    document.querySelector('.login-form__message').classList.remove('show');
                    setSuccessFor(this.email);
                    setSuccessFor(this.password);
                    localStorage.setItem('Token', JSON.stringify(loginData.TKey));
                    localStorage.setItem('CommercialName', JSON.stringify(loginData.Company.CommercialName));
                    localStorage.setItem('BIC', JSON.stringify(loginData.Company.BIC));
                    localStorage.setItem('Bank', JSON.stringify(loginData.Company.Bank));
                    localStorage.setItem('Email', JSON.stringify(loginData.Company.Email));
                    localStorage.setItem('IBAN', JSON.stringify(loginData.Company.IBAN));
                    localStorage.setItem('IDNO', JSON.stringify(loginData.Company.IDNO));
                    localStorage.setItem('JuridicalAddress', JSON.stringify(loginData.Company.JuridicalAddress));
                    localStorage.setItem('JuridicalName', JSON.stringify(loginData.Company.JuridicalName));
                    localStorage.setItem('Language', JSON.stringify(loginData.Company.Language));
                    localStorage.setItem('OfficeAddress', JSON.stringify(loginData.Company.OfficeAddress));
                    localStorage.setItem('VATCode', JSON.stringify(loginData.Company.VATCode));
                    localStorage.setItem('CountryID', JSON.stringify(loginData.Company.CountryID));
                    localStorage.setItem('Logo', JSON.stringify(loginData.Company.Logo));
                    localStorage.setItem('APIKey', JSON.stringify(loginData.Company.APIKey))
                    /* GO to main page if no error */
                    window.location = location.protocol + '//' + location.host + location.pathname;
                }, 500);
            } else {
                // handle loading 
                document.querySelector('.login-form__btn').value = 'Se încarcă...';
                document.querySelector('.login-form__btn').classList.add('charge');
                setTimeout(() => {
                    document.querySelector('.login-form__btn').value = 'Logare';
                    document.querySelector('.login-form__btn').classList.remove('charge');
                    setErrorFor(this.email, 'Date introduse incorecte.');
                    setErrorFor(this.password, '');
                    document.querySelector('.login-form__message').classList.add('show');
                }, 500);

            }
        });
    }
}
