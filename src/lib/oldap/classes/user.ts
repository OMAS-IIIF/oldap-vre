import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject("InProject")
export class InProject {
	@JsonProperty("project", String)
	project: string = "";

	@JsonProperty("permissions", [String])
	permissions: string[] = [];
}

@JsonObject("User")
export class User {

	@JsonProperty("userIri", String)
	private _userIri: string = "";
	get userIri() {
		return this._userIri;
	}

	@JsonProperty("userId", String)
	private _userId: string = "";
	get userId() {
		return this._userId;
	}

	@JsonProperty("isActive", Boolean)
	isActive: boolean = false;

	@JsonProperty("family_name", String)
	familyName?: string;

	@JsonProperty("given_name", String)
	given_name?: string;

	@JsonProperty("has_permissions", [String])
	has_permissions?: string[];

	@JsonProperty("in_projects", [InProject])
	in_projects?: InProject[];
}