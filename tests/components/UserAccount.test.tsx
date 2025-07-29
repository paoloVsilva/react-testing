import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";
import { User } from "../../src/entities";

describe("UserAccount", () => {
  const user: User = { id: 1, name: "Paolo" };
  it("should render user name", () => {
    render(<UserAccount user={{ ...user }} />);
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });

  it("should render not Edit button when the user is not an admin", () => {
    render(<UserAccount user={user} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should render an Edit button when the user is admin", () => {
    render(<UserAccount user={{ ...user, isAdmin: true }} />);
    const button = screen.queryByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Edit");
  });
});
