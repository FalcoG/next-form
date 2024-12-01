export function FieldsetAddress() {
  return (
    <fieldset id="address">
      <label>
        PostalCode
        <input type="text" name="address.postalCode" required autoComplete="postal-code"/>
      </label>
      <label>
        HouseNumber
        <input type="text" name="address.houseNumber" required/>
      </label>
      <label>
        HouseNumberAddition
        <input type="text" name="address.houseNumberAddition"/>
      </label>
      <label>
        StreetName
        <input type="text" name="address.streetName" required autoComplete="street-address"/>
      </label>
      <label>
        City
        <input type="text" name="address.city" required autoComplete="address-level2"/>
      </label>
    </fieldset>
  )
}
