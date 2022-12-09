//
// Usage - ONLY when getting dates from MongoDB for comparison
// Date(DateIST('...').toISOString())
//
export class DateIST extends Date {
	constructor(params) {
		super(params)
		this.date = new Date(params)
		this.date.setHours(this.date.getHours() + 5)
		this.date.setMinutes(this.date.getMinutes() + 30)
	}

	valueOf() {
		return this.date.toISOString()
	}

	toISOString() {
		return this.date.toISOString()
	}
}