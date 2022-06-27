# bcv-api
Micro servicio de exposición APIRest con 2 puntos de accesos <anónimos>. 

¿utilidad? 

Entrega en un bonito formato json el cambio de `X:1` __bolivar : moneda extranjera__ permitiendo hacer uso de esta conversión en cualquier aplicación consumiendo el Endpoint correspondiente.

Actualmente se maneja el cambio de bolivares a las siguientes monedas. Siendo así el valor de 1 moneda extranjera  expresado en bolívares dentro del atributo `"exchange"`
- Dolar
- Euro
- Lira Turca
- Rublo
- Yuan

#### Ejemplo ####
![Ejemplo de la respuesta del exchange EP][img1]
## ENDPOINTS
### GET v1/exchange
~~~~
response body:
[
	{
		"currency": varchar
		"exchange": float4,
		"date": timestamptz
	},
]
~~~~
~~~~
response error body:
{
	"error": object
}
~~~~
### GET v1/exchange/:curr
este endpoint permite retornar el valor más actual de la moneda selecionada
curr puede tomar el valor de: 
- Dolar
- Euro
- Lira Turca
- Rublo
- Yuan

_Si no existiera la moneda pasada entonces devolvería un arreglo vacío._
~~~~
response body:
	{
		"currency": varchar<curr>
		"exchange": float4,
		"date": timestamptz
	}
~~~~
~~~~
response error body:
{
	"error": object
}
~~~~

### Desplegado en deno ###
https://bcv-api.deno.dev/v1/exchange

[img1]: ./examples/code.png "ejemplo de la respuesta del exchange EP"