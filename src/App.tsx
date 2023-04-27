import { useEffect, useState } from 'react';
import './App.scss';
import axios from 'axios';
import { RiDeleteBinLine } from 'react-icons/ri';

const _formData = {
	jobTitle: '',
	description: '',
	location: '',
	details: {
		remote: false,
		full_time: false,
	},
	salary: 0,
};

interface IDetails {
	remote: boolean;
	full_time: boolean;
}
interface IJob {
	id: number;
	jobTitle: string;
	description: string;
	location: string;
	details: IDetails;
	salary: number;
}

const backendUrl = 'http://localhost:5557';

function App() {
	const [formData, setFormData] = useState(_formData);
	const [jobs, setJobs] = useState<IJob[]>([]);

	const getJobs = async () => {
		const response = (await axios.get(`${backendUrl}/jobs`)).data;
		setJobs(response);
	};

	useEffect(() => {
		(async () => {
			getJobs();
		})();
	}, []);

	const handleFieldChange = (e: any, field: string) => {
		const value = e.target.value;
		const checked = e.target.checked;

		switch (field) {
			case 'jobTitle':
				setFormData({ ...formData, jobTitle: value });
				break;
			case 'description':
				setFormData({ ...formData, description: value });
				break;
			case 'location':
				setFormData({ ...formData, location: value });
				break;
			case 'remote':
				setFormData({
					...formData,
					details: { ...formData.details, remote: checked },
				});
				break;
			case 'fullTime':
				setFormData({
					...formData,
					details: { ...formData.details, full_time: checked },
				});
				break;
			case 'salary':
				setFormData({ ...formData, salary: value });
				break;

			default:
				break;
		}
	};

	const handleSaveForm = async (e: any) => {
		e.preventDefault();

		const { jobTitle, description, location, salary } = formData;
		if (!jobTitle && !description && !location && salary === 0) {
			return;
		}

		const response = await axios.post(`${backendUrl}/jobs`, formData);
		getJobs();
		setFormData(_formData);
	};

	const handleDeleteJob = (job: IJob) => {
		(async () => {
			const response = await axios.delete(`${backendUrl}/jobs/${job.id}`);
			getJobs();
		})();
	};

	return (
		<div>
			<h1>Job Site</h1>

			<section className="main">
				<form onSubmit={(e) => handleSaveForm(e)}>
					<fieldset>
						<legend>New Job</legend>
						<div className="row">
							<label>Job Title</label>
							<div>
								<input
									type="text"
									value={formData.jobTitle}
									onChange={(e) =>
										handleFieldChange(e, 'jobTitle')
									}
								/>
							</div>
						</div>

						<div className="row">
							<label>Description</label>
							<div>
								<textarea
									spellCheck="false"
									value={formData.description}
									onChange={(e) =>
										handleFieldChange(e, 'description')
									}
								/>
							</div>
						</div>

						<div className="row">
							<label>Location</label>
							<div>
								<select
									onChange={(e) =>
										handleFieldChange(e, 'location')
									}
								>
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
									<input
										type="checkbox"
										id="remote"
										onChange={(e) =>
											handleFieldChange(e, 'remote')
										}
										checked={formData.details.remote}
									/>
									<label
										className="checkboxLabel"
										htmlFor="remote"
									>
										Remote
									</label>
								</div>
								<div className="checkboxItem">
									<input
										type="checkbox"
										id="fullTime"
										onChange={(e) =>
											handleFieldChange(e, 'fullTime')
										}
										checked={formData.details.full_time}
									/>
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
								<input
									type="text"
									onChange={(e) =>
										handleFieldChange(e, 'salary')
									}
									value={
										formData.salary === 0
											? ''
											: formData.salary.toString()
									}
								/>
							</div>
						</div>

						<div className="buttonRow">
							<button type="submit">Save</button>
						</div>
					</fieldset>
				</form>
				<aside className="right">
					<div className="debuggingArea">
						<h3>Debugging Panel:</h3>
						<pre>{JSON.stringify(formData, null, 2)}</pre>
						<div className="jobs">
							<h3>
								There are{' '}
								<span style={{ color: 'red' }}>
									{jobs.length}
								</span>{' '}
								Jobs:
							</h3>
							<ol>
								{jobs.map((job) => {
									return (
										<div className="job">
											<li className="title" key={job.id}>
												{job.jobTitle}
											</li>
											<div>
												<span
													onClick={() =>
														handleDeleteJob(job)
													}
													style={{
														color: 'red',
														marginLeft: '20px',
														fontWeight: 'bold',
													}}
												>
													<RiDeleteBinLine
														style={{
															cursor: 'pointer',
														}}
													/>
												</span>
											</div>
										</div>
									);
								})}
							</ol>
						</div>
					</div>
				</aside>
			</section>
		</div>
	);
}

export default App;
