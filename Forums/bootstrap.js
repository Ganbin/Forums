﻿/** Bootstrap file*/// Set the login listener and execute it with the "Administrateur" group (to be able to do query over the User dataclass and his relation attributes)directory.setLoginListener("customLoginListener", "Administrateur");// confirmation email http handleraddHttpRequestHandler('/confirmation', 'emailconf.js', 'emailConfirmation');