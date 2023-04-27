import { useState } from 'react';
import './App.scss';

const _formData = {
	jobTitel: '',
	description: '',
	location: '',
	details: {
		remote: false,
		full_time: false,
	},
	salary: 0,
};

function App() {
	const [formData, setFormData] = useState(_formData);

	return (
		<div>
			<h1>Job Site</h1>

			<section className="main">
				<form>
					<fieldset>
						<legend>New Job</legend>
						<div className="row">
							<label>Job Title</label>
							<div>
								<input type="text" />
							</div>
						</div>

						<div className="row">
							<label>Description</label>
							<div>
								<textarea spellCheck="false" />
							</div>
						</div>

						<div className="row">
							<label>Location</label>
							<div>
								<select>
									<option value="">please select</option>
									<option value="stuttgart">Stuttgart</option>
									<option value="münchen">München</option>
									<option value="berlin">Berlin</option>
									<option value="potsdam">Potsdam</option>
									<option value="bremen">Bremen</option>
									<option value="hamburg">Hamburg</option>
									<option value="wiesbaden">Wiesbaden</option>
									<option value="schwerin">Schwerin</option>
									<option value="hannover">Hannover</option>
									<option value="düsseldorf">
										Düsseldorf
									</option>
									<option value="mainz">Mainz</option>
									<option value="saarbrücken">
										Saarbrücken
									</option>
									<option value="dresden">Dresden</option>
									<option value="magdeburg">Magdeburg</option>
									<option value="kiel">Kiel</option>
									<option value="erfurt">Erfurt</option>
								</select>
							</div>
						</div>

						<div className="row">
							<label>Details</label>
							<div className="checkboxes">
								<div className="checkboxItem">
									<input type="checkbox" id="remote" />
									<label
										className="checkboxLabel"
										htmlFor="remote"
									>
										Remote
									</label>
								</div>
								<div className="checkboxItem">
									<input type="checkbox" id="fullTime" />
									<label
										className="checkboxLabel"
										htmlFor="fullTime"
									>
										Full-Time
									</label>
								</div>
							</div>
						</div>

						<div className="row rowWholeNumber">
							<label>Monthly Salary in Euros</label>
							<div>
								<input type="text" />
							</div>
						</div>

						<div className="buttonRow">
							<button>Save</button>
						</div>
					</fieldset>
				</form>
				<aside className="right">
					<div className="debuggingArea">
						<pre>{JSON.stringify(formData, null, 2)}</pre>
					</div>
				</aside>
			</section>
		</div>
	);
}

export default App;
