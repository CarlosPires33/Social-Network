import React, {Fragment} from 'react'
import spinner from './Spinner.gif'

export default () => 
    <Fragment>
        <img 
            src={spinner}
            loading='loading...'
            style={{width:'200px', margin:'auto', display:'block'}}
        />
    </Fragment>
